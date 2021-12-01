<template>
  <div>
    <h2>按钮</h2>
    <div class="buttons">
      <div>
        <ls-button class="btn" disabled>default</ls-button>
        <ls-button class="btn" disabled primary>primary</ls-button>
        <ls-button class="btn" disabled danger>danger</ls-button>
        <ls-button class="btn" warning>warning</ls-button>
        <ls-button class="btn" success>success</ls-button>
        <ls-button class="btn" prefix="icon-sousuo">前置图标按钮</ls-button>
        <ls-button class="btn" suffix="icon-shezhi">后置图标按钮</ls-button>
      </div>
      <div>
        <ls-button class="btn" type="circle">default</ls-button>
        <ls-button class="btn" type="circle" primary>primary</ls-button>
        <ls-button class="btn" type="circle" danger>danger</ls-button>
        <ls-button class="btn" type="circle" warning>warning</ls-button>
        <ls-button class="btn" type="circle" success>success</ls-button>
        <ls-button class="btn" type="circle" prefix="icon-sousuo">前置图标按钮</ls-button>
        <ls-button class="btn" type="circle" suffix="icon-shezhi">后置图标按钮</ls-button>
      </div>
      <div>
        <ls-button class="btn" type="icon">
          <i class="iconfont icon-sousuo"></i>
        </ls-button>
        <ls-button class="btn" primary type="icon">
          <i class="iconfont icon-duoxuan"></i>
        </ls-button>
        <ls-button class="btn" warning type="icon">
          <i class="iconfont icon-quxiao"></i>
        </ls-button>
        <ls-button class="btn" danger type="icon" disabled>
          <i class="iconfont icon-icon_huabanfuben"></i>
        </ls-button>
        <ls-button class="btn" success type="icon" disabled>
          <i class="iconfont icon-dui"></i>
        </ls-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.buttons .btn {
  margin: 15px 15px 15px 0;
}
</style>