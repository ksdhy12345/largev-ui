<template>
  <div class="ls-image" :style="{width:width + 'rem',height:height + 'rem'}">
    <img
      :src="url"
      @click="handlePreview"
      @error="handleError"
      @load="load"
      v-if="!isPosition && !isError"
      :style="imgSize"
    />
    <div v-if="isPosition">图片加载中...</div>
    <div v-if="isError">加载失败</div>
  </div>
  <div class="ls-image-mask" v-if="isPreview" @click.self="isPreview = !isPreview">
    <div class="ls-image-prev" v-if="previewList.length && previewIndex!=0" @click="prev">
      <i class="iconfont icon-left" style="  font-size: 2rem;"></i>
    </div>
    <img
      :src="previewUrl"
      @error="handlePreviewUrl"
      alt
      v-if="!isPreviewPosition"
      class="ls-image-preview"
      @load="previewLoad"
      :style="{...prevSize,  transform: `rotate(${rotate}deg)`,top:'0px',left:'0px'}"
      @mousewheel.self="handleWheel"
      @mousedown.prevent="handleMousedown"
      @mouseup.prevent="handleMouseUp"
      ref="previewImageRef"
    />
    <div
      class="ls-image-next"
      v-if="previewList.length && previewIndex!=previewList.length-1"
      @click="next"
    >
      <i class="iconfont icon-right" style="font-size: 2rem;"></i>
    </div>
    <div class="ls-image-left" @click="revolve(rotate - 90)">
      <i class="iconfont icon-xiangyouxuanzhuan" style="color:#fff;font-size:1.5rem;" title="向左旋转"></i>
    </div>
    <div class="ls-image-add" @click="enlarge">
      <i class="iconfont icon-zengjia" style="color:#fff;font-size:1.5rem;" title="放大"></i>
    </div>
    <div class="ls-image-reduce" @click="narrow">
      <i class="iconfont icon-jianhao_o" style="color:#fff;font-size:1.5rem;" title="缩小"></i>
    </div>
    <div class="ls-image-fuwei" @click="reset">
      <i class="iconfont icon-fuwei" style="color:#fff;font-size:1.5rem;" title="复位"></i>
    </div>
    <div class="ls-image-right" @click="revolve(rotate + 90)">
      <i class="iconfont icon-xiangzuoxuanzhuan" style="color:#fff;font-size:1.5rem;" title="向右旋转"></i>
    </div>
    <div v-if="isPreviewPosition">
      <ls-loading />
    </div>
    <div v-if="isPreviewError">加载失败</div>
  </div>
</template>

<script>
import { computed, reactive, ref, toRaw } from '@vue/reactivity'
import { nextTick, onUnmounted } from '@vue/runtime-core'
export default {
  name: 'LsImage',
  props: {
    // 正常的图片路径
    src: {
      type: String,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
      default: '',
    },
    // 带token访问的必填URL
    requestUrl: {
      type: String,
    },
    // 选填原图URL
    originalUrl: {
      type: String,
    },
    // 是否支持预览
    preview: {
      type: Boolean,
      default: false,
    },
    previewList: {
      type: Array,
      default: [],
    },
  },
  emits: ['getFile'],
  setup(props, { emit }) {
    const isPreview = ref(false) // 预览开启状态
    const isError = ref(false) // 缩略图加载失败
    const isPreviewError = ref(false) // 预览图加载失败
    const url = ref('') // 缩略图url
    const previewUrl = ref('') // 预览高清图的url
    const isPosition = ref(false) // 缩略图占位状态
    const isPreviewPosition = ref(false) // 预览图占位状态
    const previewIndex = ref()
    const rotate = ref(0)
    const previewImageRef = ref(null)
    const image = reactive({
      // 缩略图参数
      width: 0,
      height: 0,
    })
    const previewImage = reactive({
      // 预览图参数
      width: 0,
      height: 0,
    })

    // 图片显示问题：如果宽大于高  宽度放大  高度自适应  但是高度到了屏幕外
    const prevSize = computed(() => {
      if (previewImage.width == 0 || previewImage.height == 0) return
      if (previewImage.width >= previewImage.height) {
        // 以宽度显示
        let scale = (window.innerWidth * 0.8) / previewImage.width
        if (previewImage.height * scale > window.innerHeight * 0.8) {
          return { height: '80%' }
        } else {
          return { width: '80%' }
        }
      } else {
        let scale = (window.innerHeight * 0.8) / previewImage.height
        if (previewImage.width * scale > window.innerWidth * 0.8) {
          return { width: '80%' }
        } else {
          return { height: '80%' }
        }
      }
    })

    const imgSize = computed(() => {
      if (image.width == 0 || image.height == 0) return
      if (image.width >= image.height) {
        // 以宽度显示
        let scale = props.width / image.width
        if (image.height * scale > props.height) {
          return { height: '100%' }
        } else {
          return { width: '100%' }
        }
      } else {
        let scale = props.height / image.height
        if (image.width * scale > props.width) {
          return { width: '100%' }
        } else {
          return { height: '100%' }
        }
      }
    })

    /**
     * 请求路径
     * @param requestUrl 请求路径
     * @param type 类型（原图：false、缩略图：true）
     */
    const getFile = (requestUrl, type) => {
      fetch(`${requestUrl}`, {
        headers: {
          Authorization: props.token,
          'Content-Type': 'application/octet-stream',
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            type ? (isError.value = true) : (isPreviewError.value = true)
          }
          return await response.blob()
        })
        .then(async (res) => {
          if (res.type == 'text/plain')
            type ? (isError.value = true) : (isPreviewError.value = true)
          else {
            const blob = new Blob([res])

            if (type) url.value = window.URL.createObjectURL(blob)
            else {
              previewUrl.value = window.URL.createObjectURL(blob)
            }
          }
        })
        .catch((e) => {
          type ? (isError.value = true) : (isPreviewError.value = true)
        })
        .finally(() => {
          type ? (isPosition.value = false) : (isPreviewPosition.value = false)
        })
    }

    /**
     * 缩略图加载失败
     */
    const handleError = (e) => {
      // 网络请求慢时需要的占位内容
      if (!isError.value) isPosition.value = true
    }

    /**
     * 预览图加载失败
     */
    const handlePreviewUrl = () => {
      if (!isPreviewError.value) isPreviewPosition.value = true
    }

    /**
     * 图片预览
     */
    const handlePreview = () => {
      rotate.value = 0
      if (props.previewList) {
        // 确定index
        previewIndex.value = previewIndex.value = toRaw(
          props.previewList
        ).indexOf(props.src || props.originalUrl || props.requestUrl)
      }
      if (props.preview) {
        isPreview.value = true
        if (props.originalUrl) {
          getFile(props.originalUrl, false)
        } else {
          previewUrl.value = url.value
        }
      }
    }

    // 点击上一张
    const prev = () => {
      rotate.value = 0
      previewUrl.value = ''
      previewIndex.value--
      getFile(props.previewList[previewIndex.value], false)
    }

    // 点击下一张
    const next = () => {
      rotate.value = 0
      previewUrl.value = ''
      previewIndex.value++
      getFile(props.previewList[previewIndex.value], false)
    }

    /**
     * 缩略图图片加载
     */
    const load = (e) => {
      console.log('load')
      image.width = e.currentTarget.naturalWidth
      image.height = e.currentTarget.naturalHeight
      window.URL.revokeObjectURL(url.value)
    }

    /**
     * 预览图片加载
     */
    const previewLoad = (e) => {
      // isPreviewPosition.value = false
      previewImage.width = e.currentTarget.naturalWidth
      previewImage.height = e.currentTarget.naturalHeight
      window.URL.revokeObjectURL(previewUrl.value)
    }

    // 鼠标滚轮
    const handleWheel = (e) => {
      // 负大正小
      if (e.deltaY < 0) {
        if (parseInt(e.target.style.height || e.target.style.width) >= 500)
          return
        if (prevSize.value.height) {
          e.target.style.height = parseInt(e.target.style.height) + 5 + '%'
        }
        if (prevSize.value.width) {
          e.target.style.width = parseInt(e.target.style.width) + 5 + '%'
        }
      } else {
        if (parseInt(e.target.style.height || e.target.style.width) <= 50)
          return
        if (prevSize.value.height) {
          e.target.style.height = parseInt(e.target.style.height) - 5 + '%'
        }
        if (prevSize.value.width) {
          e.target.style.width = parseInt(e.target.style.width) - 5 + '%'
        }
      }
    }

    // 点击放大
    const enlarge = (e) => {
      if (
        parseInt(
          previewImageRef.value.style.height ||
            previewImageRef.value.style.width
        ) >= 500
      )
        return
      if (prevSize.value.height) {
        previewImageRef.value.style.height =
          parseInt(previewImageRef.value.style.height) + 20 + '%'
      }
      if (prevSize.value.width) {
        previewImageRef.value.style.width =
          parseInt(previewImageRef.value.style.width) + 20 + '%'
      }
    }

    // 点击缩小
    const narrow = (e) => {
      if (
        parseInt(
          previewImageRef.value.style.height ||
            previewImageRef.value.style.width
        ) <= 50
      )
        return
      if (prevSize.value.height) {
        previewImageRef.value.style.height =
          parseInt(previewImageRef.value.style.height) - 20 + '%'
      }
      if (prevSize.value.width) {
        previewImageRef.value.style.width =
          parseInt(previewImageRef.value.style.width) - 20 + '%'
      }
    }

    // 旋转
    const revolve = (deg) => {
      previewImageRef.value.style.transition = 'transform 0.5s ease-in-out'
      rotate.value = deg
    }

    // 复位
    const reset = (e) => {
      previewImageRef.value.style.transition = 'transform 0s ease-in-out'
      rotate.value = 0
      if (prevSize.value.height)
        previewImageRef.value.style.height = prevSize.value.height
      else previewImageRef.value.style.width = prevSize.value.width
    }

    const position = reactive({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
    })

    // 拖拽图片
    const drag = (moveEvent) => {
      moveEvent.target.style.top =
        position.top + moveEvent.y - position.y + 'px'

      moveEvent.target.style.left =
        position.left + moveEvent.x - position.x + 'px'
    }
    const handleMousedown = (e) => {
      position.x = e.x
      position.y = e.y
      position.left = parseInt(e.target.style.left)
      position.top = parseInt(e.target.style.top)
      e.target.style.cursor = 'grabbing'
      e.target.addEventListener('mousemove', drag)
    }

    const handleMouseUp = (e) => {
      e.target.style.cursor = 'grab'
      e.target.removeEventListener('mousemove', drag)
    }

    // 提供src就不会执行请求行为
    if (!props.src) {
      getFile(props.requestUrl, true) // 加载缩略图
    } else {
      url.value = props.src
      if (props.originalUrl && props.src) {
        previewUrl.value = props.originalUrl
      }
    }

    /**
     * 添加监听esc
     */
    window.addEventListener(
      'keyup',
      (event) => event.keyCode == 27 && (isPreview.value = false)
    )
    onUnmounted(() => window.removeEventListener('keyup'))

    return {
      isPreview,
      handleError,
      isError,
      load,
      url,
      image,
      previewUrl,
      handlePreview,
      isPosition,
      isPreviewPosition,
      isPreviewError,
      handlePreviewUrl,
      previewLoad,
      previewImage,
      previewIndex,
      prev,
      next,
      prevSize,
      imgSize,
      rotate,
      handleWheel,
      handleMousedown,
      handleMouseUp,
      enlarge,
      narrow,
      reset,
      previewImageRef,
      revolve,
    }
  },
}
</script>

<style scoped>
.ls-image {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ls-image-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ls-image-preview {
  user-select: none;
  transition: transform 0.5s ease-in-out;
  /* transition: width 0.25s ease-in-out;
  transition: height 0.25s ease-in-out; */
  z-index: 0;
  position: relative;
  cursor: grab;
}
.ls-image-prev,
.ls-image-next {
  color: #fff;
  position: absolute;
  top: 50%;
  background-color: #606266;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
}
.ls-image-prev {
  left: 1rem;
}
.ls-image-next {
  right: 1rem;
}

.ls-image-left,
.ls-image-right,
.ls-image-add,
.ls-image-reduce,
.ls-image-fuwei {
  position: absolute;
  bottom: 2rem;
  cursor: pointer;
  background-color: #606266;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 100;
  margin-left: -1.5rem;
}
.ls-image-left {
  left: 54%;
}
.ls-image-right {
  left: 58%;
}
.ls-image-add {
  left: 42%;
}
.ls-image-reduce {
  left: 46%;
}
.ls-image-fuwei {
  left: 50%;
}
</style>