<template>
  <div :class="wrapCls"
       @click="showPicker">
    <slot>{{placeholderText ? placeholderText : conf.placeholder}}</slot>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
import Picker from 'better-picker'
const { name, class: prefixCls } = createNamespace('date-picker')

export default {
  name,
  props: {
    // 兼容旧版attrs传参方式
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
    startYear: {
      type: [Number, String],
      default: '',
      validator: function (value) {
        return !isNaN(value)
      }
    },
    endYear: {
      type: [Number, String],
      default: '',
      validator: function (value) {
        return !isNaN(value)
      }
    },
    offsetYear: {
      type: [Number, String],
      default: 0,
      validator: function (value) {
        return !isNaN(value)
      }
    },
    yearsLength: {
      type: [Number, String],
      default: 10,
      validator: function (value) {
        return !isNaN(value)
      }
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
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: Boolean,
    textFormat: {
      type: [String, Function],
      default: 'yyyy/mm/dd'
    },
    valueFormat: {
      type: [String, Function],
      default: 'yyyy/mm/dd'
    },
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
      currentValue: this.value,
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
    // 合并attrs参数到props，兼容旧版attrs传参方式
    conf () {
      let attrs = this.$props.attrs
      let props = {}
      for (let key in this.$props) {
        if (key !== 'attrs') {
          props[key] = key in attrs ? attrs[key] : this.$props[key]
        }
      }
      return props
    },
    wrapCls () {
      let mode = this.conf.mode || this.form && this.form.mode || 'default'
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
  watch: {
    'attrs.value': function () {
      this.initPickerData()
    },
    "value": function (val) {
      this.initPickerData()
    }
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
      let { text } = this.generateResult()
      if (value != '') this.placeholderText = text
      this.currentValue = value
    },
    showPicker (e) {
      let self = this,
        pickerData = this.pickerData;

      if (this.conf.disabled) return
      if (!this.picker) {
        let pickerTitle = this.conf.pickerTitle
        let pickerCancelBtnText = this.conf.pickerCancelBtnText || (this.form && this.form.datePickerCancelBtnText)
        let pickerConfirmBtnText = this.conf.pickerConfirmBtnText || (this.form && this.form.datePickerConfirmBtnText)
        let mode = this.conf.pickerMode || this.form && this.form.mode || 'default'
        this.picker = new Picker({
          data: pickerData,
          selectedIndex: self.pickerSelectedIndex,
          title: pickerTitle
        });
        pickerCancelBtnText && (this.picker.cancelEl.innerHTML = pickerCancelBtnText)
        pickerConfirmBtnText && (this.picker.confirmEl.innerHTML = pickerConfirmBtnText)
        this.picker.pickerEl.setAttribute('mode', mode)
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
      startYear = startYear * 1 || new Date().getFullYear() + offsetYear * 1
      endYear = endYear || (startYear + yearsLength * 1)
      return new Array((endYear - startYear) === 0 ? 1 : endYear - startYear).fill('').map((item, index) => {
        let year = startYear + index
        return { text: `${pickerFormatter && pickerFormatter('year', year) || year}`, value: `${year}` }
      })
    },
    generateMonthData () {
      let { language, pickerFormatter } = this.conf
      let en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let id = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
      let result = [];
      for (let i = 0; i < 12; i++) {
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
      for (let i = 1; i <= maxDate; i++) {
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
      return { year, month, day, value, text }
    },
    onConfirm () {
      let { year, month, day, value, text } = this.generateResult()
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
      let thisYear = this.pickerData[this.yearIndexInColumnsOrder][this.pickerSelectedIndex[this.yearIndexInColumnsOrder]].value,
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
