<template>
  <div v-for="item in list" :key="item">
    <ls-image
      width="20"
      preview
      height="20"
      :requestUrl="item + '&original=false'"
      :originalUrl="item + '&original=true'"
      :token="token"
      :previewList="list.map(path=>path+'&original=true')"
    ></ls-image>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nIiwiZXhwIjoxNjQwMjQ3Nzc0LCJpc3MiOiJiam11LmNuIiwiYXVkIjoiYmptdSJ9.GDuV6Quc_I2CtXIQjnZ9DrDaeqgxm6VeK42t6a9HpI4',
      list: [
        'http://10.14.24.180:5000/api/u/File/DownLoad?fileid=197576b910bf487187ea870203ee5441',
        'http://10.14.24.180:5000/api/u/File/DownLoad?fileid=4f8b865a11dd4f14b337bcfad2a11540',
        'http://10.14.24.180:5000/api/u/File/DownLoad?fileid=3feb40b475c7400e82a03dbafc55e99b',
        'http://10.14.24.180:5000/api/u/File/DownLoad?fileid=dbc8c10172f34aa29a30be396dc98b76',
        'http://10.14.24.180:5000/api/u/File/DownLoad?fileid=34461b6af3a64884b8cfee146000fb27',
        'http://10.14.24.180:5000/api/u/File/DownLoad?fileid=2abd5c70c2464fbd8a03aa41b73b5621',
        'http://10.14.24.180:5000/api/u/File/DownLoad?fileid=fdf05e26db5b4e50af7ad26222c2583d',
        'http://10.14.24.180:5000/api/u/File/DownLoad?fileid=42c1a31a5edd44f598d6bc242fec721e',
        'http://10.14.24.180:5000/api/u/File/DownLoad?fileid=eb21b9f60a044a59938166b2dc60e410',
        'http://10.14.24.180:5000/api/u/File/DownLoad?fileid=82f50896cb9b4841b16b4b6dcaf01a03',
      ],
    }
  },
}
</script>

<style scoped>
div {
  width: 20rem;
  height: 20rem;
  border: 1px solid #000;
  float: left;
}
</style>