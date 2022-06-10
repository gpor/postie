<template>
  <div>
    <div class="history">
      <div
        class="-request"
        v-for="req in history"
        :key="req.created"
      >
        <h2>{{ req.url }}</h2>
        <pre
          v-if="req.response"
          v-html="req.stringData()"></pre>
      </div>
    </div>
    <form
      class="new-request"
      @submit.prevent="submit"
    >
      <input
        type="text"
        v-model="newUrl"
      />
      <select
        v-model="newType"
      >
        <option value="get" selected>get</option>
        <option value="post">post</option>
      </select>
      <button
        type="submit"
      >Request</button>
    </form>
  </div>
</template>

<script>
import Request from './models/Request.js'

export default {
  data() {
    return {
      history: [],
      newUrl: 'http://127.0.0.1:5000/api/v1/courses',
      newType: 'get',
    }
  },
  created() {
    console.log('app.vue foobar')
  },
  methods: {
    submit() {
      const req = reactive(new Request(this.newUrl))
      req.make()
      this.history.push(req)
    }
  }
}
</script>

<style>
button {
  padding: 0.7em 2em;
  border-radius: 0.3em;
  background-color: #56f;
  color: #fff;
  border: none;
}
.new-request {
  display: flex;
  gap: 12px;
}
input[type='text'], select {
  padding: 0.3em 0.5em;
  font-size: 20px;
  border-radius: 0.3em;
  border: 1px solid #ddd;
}
input[type='text']:focus, select:focus,
input[type='text']:focus-visible, select:focus-visible {
  border: 1px solid #aaa;
  outline: none;
}
input[type='text'] {
  width: 800px;
}
select {
  width: 100px;
}
</style>