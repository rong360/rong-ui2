<template>
  <div :class="wrapCls"
       @click="showPicker">
    {{placeholderText ? placeholderText : conf.placeholder}}
    <slot></slot>
  </div>
</template>

<script>
import Picker from 'better-picker'

const prefixCls = 'r--datepicker'

export default {
  name: "DatePicker",
  props: {
    attrs: {
      type: Object,
      default: function () {
        return {};
      }
    },
    pickerTitle: String,
    pickerCancelBtnText: String,
    pickerConfirmBtnText: String
  },
  data () {
    return {
      currentValue: '',
      placeholderText: '',
      pickerData: [],
      pickerSelectedIndex: []
    }
  },
  inject: {
    form: { default: null }
  },
  computed: {
    wrapCls () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-empty`]: this.currentValue == ''
        }
      ]
    },
    conf () {
      let defaultConfig = {
        value: this.attrs.value || '',
        valueFormat: this.attrs.valueFormat || 'yyyy/mm/dd',
        textFormat: this.attrs.textFormat || 'yyyy/mm/dd',
        type: this.attrs.type || 'date',
        placeholder: this.attrs.placeholder || '',
        startYear: this.attrs.startYear || '',
        endYear: this.attrs.endYear || '',
        yearsLength: this.attrs.yearsLength || '10',
        title: this.attrs.pickerTitle || '',
        disabled: this.attrs.disabled || false,
        pickerYearUnit: typeof this.attrs.pickerYearUnit != 'undefined' ? this.attrs.pickerYearUnit : '年',
        pickerMonthUnit: typeof this.attrs.pickerMonthUnit != 'undefined' ? this.attrs.pickerMonthUnit : '月',
        pickerDateUnit: typeof this.attrs.pickerDateUnit != 'undefined' ? this.attrs.pickerDateUnit : '日'
      };
      return defaultConfig;
    }
  },
  created () {
    this.initPickerData();
  },
  methods: {
    initPickerData () {
      let today = new Date(),
        thisYear = today.getFullYear(),
        thisMonth = today.getMonth() + 1,
        thisDate = today.getDate();

      if (this.conf.value) {
        var value = this.conf.value.replace('年', '/').replace('月', '/').replace('日', ''),
          d = new Date(value),
          defaultYear = d.getFullYear(),
          defaultMonth = d.getMonth() + 1,
          defaultDate = d.getDate();
        if (!isNaN(defaultYear)) {
          thisYear = defaultYear;
          thisMonth = defaultMonth;
          thisDate = defaultDate;
        }
      }

      if (this.conf.value != '') {
        let textFormat = this.conf.textFormat.toLowerCase()
        textFormat = textFormat.replace('yyyy', thisYear)
        textFormat = textFormat.replace('mm', this.valueFormatTwoDigitInteger(thisMonth))
        textFormat = textFormat.replace('dd', this.valueFormatTwoDigitInteger(thisDate))
        this.placeholderText = textFormat
      } else {
        this.placeholderText = ''
      }

      let startYear = parseInt(this.conf.startYear) || thisYear,
        endYear = parseInt(this.conf.endYear) || startYear + parseInt(this.conf.yearsLength),
        years = this.generateYearData(startYear, endYear),
        months = this.generateMonthData(),
        dates = this.generateDateData();

      /* let selectedYearIndex = years.findIndex(function(year){
        return year.value == thisYear;
      }); */

      var selectedYearIndex = 0
      for (var i = 0; i < years.length; i++) {
        if (years[i].value == thisYear) {
          selectedYearIndex = i;
          break;
        }
      }
      selectedYearIndex = selectedYearIndex == -1 ? 0 : selectedYearIndex;

      let maxDate = this.getMaxDate(parseInt(thisYear), parseInt(thisMonth));
      dates.length = maxDate;

      this.currentValue = this.conf.value || '';
      this.pickerData = [years, months, dates];
      this.pickerSelectedIndex = [selectedYearIndex, thisMonth - 1, thisDate - 1];
    },
    showPicker (e) {
      let self = this,
        pickerData = this.pickerData;

      if (this.conf.disabled) return
      if (!this.picker) {
        switch (this.conf.type) {
          case 'year':
            pickerData = this.pickerData.slice(0, 1);
            break;
          case 'month':
            pickerData = this.pickerData.slice(0, 2);
            break;
        }
        let pickerTitle = this.attrs.pickerTitle || this.pickerTitle
        let pickerCancelBtnText = this.attrs.pickerCancelBtnText || this.pickerCancelBtnText || (this.form && this.form.datePickerCancelBtnText)
        let pickerConfirmBtnText = this.attrs.pickerConfirmBtnText || this.pickerConfirmBtnText || (this.form && this.form.datePickerConfirmBtnText)
        this.picker = new Picker({
          data: pickerData,
          selectedIndex: self.pickerSelectedIndex,
          title: pickerTitle
        });
        pickerCancelBtnText && (this.picker.cancelEl.innerHTML = pickerCancelBtnText)
        pickerConfirmBtnText && (this.picker.confirmEl.innerHTML = pickerConfirmBtnText)
        this.picker.on('picker.change', function (index, selectedIndex) {
          self.pickerSelectedIndex[index] = selectedIndex;
          // 年或月变化时更新天数
          if ((index == 0 || index == 1) && self.conf.type == 'date') {
            self.refillDates();
          }
          // self.generateResult();
        });
        this.picker.on('picker.select', function (index, selectedIndex) {
          self.generateResult();
          self.picker && self.removePiker()
        });
        this.picker.on('picker.cancel', function () {
          self.picker && self.removePiker()
        });
        this.picker.maskEl.onclick = function () {
          self.picker.trigger('picker.cancel')
        }
      }

      this.picker.show();
    },
    refillDates () {
      var thisYear = this.pickerData[0][this.pickerSelectedIndex[0]].value,
        thisMonth = this.pickerData[1][this.pickerSelectedIndex[1]].value,
        maxDate = this.getMaxDate(thisYear, thisMonth),
        dates = this.generateDateData(1, maxDate),
        dateSelectedIndex = this.pickerSelectedIndex[2];

      this.picker.refillColumn(2, dates);

      if (dateSelectedIndex > (maxDate - 1)) {
        this.pickerSelectedIndex[2] = maxDate - 1;
        this.picker.scrollColumn(2, this.pickerSelectedIndex[2]);
      }
    },
    valueFormatTwoDigitInteger (value) {
      value = value.toString();
      return (value.length == 1 ? '0' : '') + value;
    },
    generateYearData (startYear, endYear) {
      let result = [],
        sYear = startYear,
        eYear = endYear;
      if (eYear <= startYear) eYear = startYear + this.conf.yearsLength * 1;
      for (; sYear < endYear; sYear++) {
        result.push({
          text: sYear + this.conf.pickerYearUnit,
          value: sYear
        });
      }
      return result;
    },
    generateMonthData () {
      var result = [];
      for (var i = 1; i < 13; i++) {
        result.push({
          text: this.valueFormatTwoDigitInteger(i) + this.conf.pickerMonthUnit,
          value: this.valueFormatTwoDigitInteger(i)
        })
      }
      return result;
    },
    generateDateData (startDate, endDate) {
      var result = [],
        sDate = startDate || 1,
        eDate = endDate || 31;
      for (; sDate <= eDate; sDate++) {
        result.push({
          text: this.valueFormatTwoDigitInteger(sDate) + this.conf.pickerDateUnit,
          value: this.valueFormatTwoDigitInteger(sDate)
        })
      }
      return result;
    },
    generateResult () {
      var thisYear = this.pickerData[0][this.pickerSelectedIndex[0]].value,
        thisMonth = this.pickerData[1][this.pickerSelectedIndex[1]].value,
        thisDate = this.pickerData[2][this.pickerSelectedIndex[2]].value,
        valueFormat = this.conf.valueFormat.toLowerCase(),
        textFormat = this.conf.textFormat.toLowerCase();

      var value = valueFormat.replace('yyyy', thisYear).replace('mm', thisMonth).replace('dd', thisDate);
      var text = textFormat.replace('yyyy', thisYear).replace('mm', thisMonth).replace('dd', thisDate);

      this.currentValue = value;
      this.placeholderText = text

      this.$emit("onconfirm", {
        year: thisYear,
        month: thisMonth,
        date: thisDate,
        value: value
      });
    },
    getMaxDate (year, month) {
      return (new Date(new Date(year, month, 1) - 1)).getDate();
    },
    removePiker () {
      if (this.picker && this.picker.pickerEl) {
        this.picker.pickerEl.parentNode.removeChild(this.picker.pickerEl);
        this.picker = null
      }
    }
  },
  beforeDestroy () {
    this.removePiker()
  }
}
</script>

<style lang="less">
@datepickerCls: r--datepicker;

.@{datepickerCls} {
  &-empty {
    color: #c8c7cc;
  }
  min-height: 20px;
}
</style>
