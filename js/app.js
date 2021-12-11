const 文件 = document
const 值 = "value"
const 輸入 = "input"

const 顯示 = (節點) => (節點.hidden = false)
const 隱藏 = (節點) => (節點.hidden = true)
const 渲染 = (節點, 內容) => (節點.innerHTML = 內容)
const 取得節點 = (名字) => 文件.getElementById(名字)
const 取得數值 = (字串) => Number(字串)
const 取得屬性 = (節點, 標籤) => 節點[標籤]
const 註冊事件 = (節點, 事件, 函式) => 節點.addEventListener(事件, 函式)

class 計算機 {
  constructor() {
    this.註冊事件()
  }

  get 區間下限價格欄位() {
    return 取得節點("區間下限價格")
  }

  get 區間上限價格欄位() {
    return 取得節點("區間上限價格")
  }

  get 網格掛單數欄位() {
    return 取得節點("網格掛單數")
  }

  get 交易總量欄位() {
    return 取得節點("交易總量")
  }

  get 表格節點() {
    return 取得節點("表格")
  }

  get 訂單簿節點() {
    return 取得節點("訂單簿")
  }

  get 區間下限價格() {
    const 區間下限價格 = this.取得欄位數值("區間下限價格欄位")

    return 區間下限價格
  }

  get 區間上限價格() {
    const 區間上限價格 = this.取得欄位數值("區間上限價格欄位")

    return 區間上限價格
  }

  get 網格掛單數() {
    const 網格掛單數 = this.取得欄位數值("網格掛單數欄位")

    return 網格掛單數
  }

  get 交易總量() {
    const 交易總量 = this.取得欄位數值("交易總量欄位")

    return 交易總量
  }

  get 掛單價格列表() {
    const 區間下限價格 = this.區間下限價格
    const 區間上限價格 = this.區間上限價格
    const 網格掛單數 = this.網格掛單數
    const 等差價格 = (區間上限價格 - 區間下限價格) / (網格掛單數 - 1)

    return [...Array(網格掛單數).keys()].map((v) => v * 等差價格 + 區間下限價格)
  }

  get 完成表單() {
    return this.區間下限價格 > 0 && this.區間上限價格 > 0 && this.交易總量 > 0
  }

  取得欄位數值(欄位, 屬性 = 值) {
    return 取得數值(取得屬性(this[欄位], 屬性))
  }

  註冊事件() {
    註冊事件(this.區間下限價格欄位, 輸入, () => {
      this.區間下限價格
    })

    註冊事件(this.區間上限價格欄位, 輸入, () => {
      this.區間上限價格
    })

    註冊事件(this.網格掛單數欄位, 輸入, () => {
      this.網格掛單數
    })

    註冊事件(this.交易總量欄位, 輸入, () => {
      this.交易總量
    })

    註冊事件(文件, 輸入, () => {
      this.處理報價()
    })
  }

  處理報價() {
    if (!this.完成表單) {
      return 隱藏(this.表格節點)
    }

    const 訂單簿 = this.掛單價格列表
      .map((掛單價格) => {
        const 交易數量 = this.交易總量 / this.網格掛單數
        const 價值 = 掛單價格 * 交易數量
        return `
        <tr class="text-center">
          <td>
            ${掛單價格}
          </td>
          <td>
            ${交易數量}
          </td>
          <td>
            ${價值}
          </td>
        </tr>
      `
      })
      .join("")

    渲染(this.訂單簿節點, 訂單簿)
    顯示(this.表格節點)
  }
}

new 計算機()
