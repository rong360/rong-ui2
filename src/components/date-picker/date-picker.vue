<template>
  <div :class="wrapCls"
       @click="showPicker">
    <slot>{{placeholderText ? placeholderText : conf.placeholder}}</slot>
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
    value: {
      type: String,
      default: ''
    },
    startYear: Number,
    endYear: Number,
    offsetYear: {
      type: Number,
      default: 0
    },
    yearsLength: {
      type: Number,
      default: 10
    },
    columnsOrder: {
      type: Array,
      default () {
        return ['year', 'month', 'day']
      }
    },
    language: {
      type: String,
      default: 'zh' // 中文 'zh'、 英文 'en'、 印尼 'id'
    },
    placeholder: String,
    disabled: Boolean,
    textFormat: [String, Function],
    valueFormat: [String, Function],
    pickerFormatter: Function,
    pickerTitle: String,
    pickerCancelBtnText: String,
    pickerConfirmBtnText: String,
    mode: {
      type: String
    }
  },
  data () {
    return {
      currentValue: '',
      placeholderText: '',
      pickerData: [],
      pickerSelectedIndex: [],
      yearIndexInColumnsOrder: -1,
      monthIndexInColumnsOrder: -1,
      dayIndexInColumnsOrder: -1
    }
  },
  inject: {
    form: { default: null }
  },
  computed: {
    conf () {
      let defaultConfig = {
        value: this.attrs.value || '',
        valueFormat: this.attrs.valueFormat || this.valueFormat || 'yyyy/mm/dd',
        textFormat: this.attrs.textFormat || this.textFormat || 'yyyy/mm/dd',
        placeholder: this.attrs.placeholder || this.placeholder || '',
        startYear: parseInt(this.attrs.startYear || this.startYear),
        endYear: parseInt(this.attrs.endYear || this.endYear),
        offsetYear: parseInt(this.attrs.offsetYear || this.offsetYear),
        yearsLength: parseInt(this.attrs.yearsLength || this.yearsLength),
        columnsOrder: this.attrs.columnsOrder || this.columnsOrder,
        language: this.attrs.language || this.language,
        pickerFormatter: this.attrs.pickerFormatter || this.pickerFormatter,
        title: this.attrs.pickerTitle || this.pickerTitle,
        disabled: this.attrs.disabled || this.disabled
      };
      return defaultConfig;
    },
    wrapCls () {
      let mode = this.attrs.mode || this.mode || this.form && this.form.mode || 'default'
      return [
        `${prefixCls}`,
        `${prefixCls}-mode-${mode}`,
        {
          [`${prefixCls}-empty`]: this.currentValue == ''
        }
      ]
    }
  },
  beforeMount () {
    this.initPickerData()
  },
  methods: {
    initPickerData () {
      let { columnsOrder, value } = this.conf
      let isValidDate = !isNaN(new Date(value).getTime())
      let today = isValidDate ? new Date(value) : new Date()
      let thisYear = today.getFullYear()
      let thisMonth = today.getMonth()
      let thisDay = today.getDate()
      let time = {
        year: this.generateYearData(),
        month: this.generateMonthData(),
        day: this.generateDayData(this.getMaxDate(thisYear, thisMonth))
      }
      let timeSelectedIndex = {
        year: time.year.findIndex(item => item.value * 1 == thisYear),
        month: time.month.findIndex(item => item.value * 1 == thisMonth + 1),
        day: time.day.findIndex(item => item.value * 1 == thisDay)
      }
      this.pickerData = columnsOrder.map(item => time[item])
      this.pickerSelectedIndex = columnsOrder.map(item => timeSelectedIndex[item] < 0 ? 0 : timeSelectedIndex[item])
      // 查找year、month、day 在columnsOrder的索引
      for (let i = 0; i < columnsOrder.length; i++) {
        let type = columnsOrder[i]
        if (type == 'year') {
          this.yearIndexInColumnsOrder = i
        } else if (type == 'month') {
          this.monthIndexInColumnsOrder = i
        } else if (type == 'day') {
          this.dayIndexInColumnsOrder = i
        }
      }
      let {text} = this.generateResult()
      if (value != '') this.placeholderText = text
      this.currentValue = value
    },
    showPicker (e) {
      let self = this,
        pickerData = this.pickerData;

      if (this.attrs.disabled || this.disabled) return
      if (!this.picker) {
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
          if ((index == self.yearIndexInColumnsOrder || index == self.monthIndexInColumnsOrder) && self.monthIndexInColumnsOrder > -1) {
            self.refillDates();
          }
          // self.generateResult();
        });
        this.picker.on('picker.select', function (index, selectedIndex) {
          self.onConfirm();
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
    generateYearData () {
      let { startYear, endYear, offsetYear, yearsLength, pickerFormatter } = this.conf
      startYear = startYear || new Date().getFullYear() + offsetYear
      endYear = endYear || (startYear + yearsLength)

      return new Array(endYear - startYear).fill('').map((item, index) => {
        let year = startYear + index
        return { text: `${pickerFormatter && pickerFormatter('year', year) || year}`, value: `${year}` }
      })
    },
    generateMonthData () {
      let { language, pickerFormatter } = this.conf
      let en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let id = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
      let result = [];
      for (var i = 0; i < 12; i++) {
        let text = this.valueFormatTwoDigitInteger(i + 1)
        if (language == 'en') {
          text = en[i]
        } else if (language == 'id') {
          text = id[i]
        }
        result.push({
          text: `${pickerFormatter && pickerFormatter('month', text) || text}`,
          value: this.valueFormatTwoDigitInteger(i + 1)
        })
      }
      return result;
    },
    generateDayData (maxDate = 31) {
      let { pickerFormatter } = this.conf
      let result = []
      for (var i = 1; i <= maxDate; i++) {
        let day = this.valueFormatTwoDigitInteger(i)
        result.push({
          text: `${pickerFormatter && pickerFormatter('day', day) || day}`,
          value: day
        })
      }
      return result;
    },
    generateResult () {
      let { textFormat, valueFormat } = this.conf
      let year = this.yearIndexInColumnsOrder > -1 ? this.pickerData[this.yearIndexInColumnsOrder][this.pickerSelectedIndex[this.yearIndexInColumnsOrder]] : {}
      let month = this.monthIndexInColumnsOrder > -1 ? this.pickerData[this.monthIndexInColumnsOrder][this.pickerSelectedIndex[this.monthIndexInColumnsOrder]] : {}
      let day = this.dayIndexInColumnsOrder > -1 ? this.pickerData[this.dayIndexInColumnsOrder][this.pickerSelectedIndex[this.dayIndexInColumnsOrder]] : {}
      let text = typeof textFormat == 'function' ? textFormat({ year, month, day }) : textFormat.replace('yyyy', year.text).replace('mm', month.value).replace('dd', day.value).replace(/\/undefined/g, '')
      let value = typeof valueFormat == 'function' ? valueFormat({ year, month, day }) : valueFormat.replace('yyyy', year.value).replace('mm', month.value).replace('dd', day.value).replace(/\/undefined/g, '')
      return {year, month, day, value, text}
    },
    onConfirm () {
      let {year, month, day, value, text} = this.generateResult()
      this.placeholderText = text
      this.currentValue = value
      this.$emit("onconfirm", {
        year: year.value,
        month: month.value,
        day: day.value,
        date: day.value,
        value
      });
    },
    refillDates () {
      var thisYear = this.pickerData[this.yearIndexInColumnsOrder][this.pickerSelectedIndex[this.yearIndexInColumnsOrder]].value,
        thisMonth = this.pickerData[this.monthIndexInColumnsOrder][this.pickerSelectedIndex[this.monthIndexInColumnsOrder]].value,
        maxDate = this.getMaxDate(thisYear, thisMonth),
        dates = this.generateDayData(maxDate),
        dateSelectedIndex = this.pickerSelectedIndex[this.dayIndexInColumnsOrder];

      this.picker.refillColumn(this.dayIndexInColumnsOrder, dates);

      if (dateSelectedIndex > (maxDate - 1)) {
        this.pickerSelectedIndex[this.dayIndexInColumnsOrder] = maxDate - 1;
        this.picker.scrollColumn(this.dayIndexInColumnsOrder, this.pickerSelectedIndex[this.dayIndexInColumnsOrder]);
      }
    },
    valueFormatTwoDigitInteger (value) {
      value = value.toString();
      return (value.length == 1 ? '0' : '') + value;
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
  &-mode-to-top&-empty {
    color: transparent;
  }
  &-empty {
    color: #c8c7cc;
  }
  min-height: 20px;
}
</style>
