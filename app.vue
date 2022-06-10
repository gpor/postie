<template>
  <div>
    <div
      class="history"
    >
      <div
        v-for="req in history" 
        :key="req.created"
        class="-request"
      >
        <h2>{{ req.url }}</h2>
        <div
          v-if="req.loading"
        >
          <h4>Loading</h4>
        </div>
        <div
          v-else
        >
          <h3
            v-if="req.error !== null"
          >
            {{ req.error.message }}
          </h3>
          <pre
            v-if="req.response !== null"
            v-html="req.stringData()"
          ></pre>
        </div>
      </div>
    </div>
    <form
      class="new-request"
      @submit.prevent="submit"
    >
      <div>
        <input
          v-model="newUrl"
          type="text"
        />
        <select
          v-model="newMethod"
        >
          <option
            value="get"
            selected
          >
            get
          </option>
          <option value="post">
            post
          </option>
        </select>
        <button
          type="submit"
        >
          Request
        </button>
      </div>
      <div
        v-if="['post'].includes(newMethod)"
      >
        <textarea
          v-model="newData"
        ></textarea>
      </div>
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
      newMethod: 'get',
      newData: '',
    }
  },
  methods: {
    submit() {
      const req = reactive(new Request(this.newUrl, this.newMethod, this.newData))
      req.send()
      this.history.push(req)
    },
  },
}
</script>

<style>
.history {
}
.history .-request {
  margin-bottom: 50px;
}
button {
  padding: 0.7em 2em;
  border-radius: 0.3em;
  background-color: #56f;
  color: #fff;
  border: none;
}
.new-request {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  max-width: 1000px;
}
.new-request > div {
  display: flex;
  gap: 12px;
}
input[type='text'], select, textarea {
  padding: 0.3em 0.5em;
  font-size: 20px;
  border-radius: 0.3em;
  border: 1px solid #ddd;
}
input[type='text']:focus, select:focus, textarea:focus,
input[type='text']:focus-visible, select:focus-visible, textarea:focus-visible {
  border: 1px solid #aaa;
  outline: none;
}
input[type='text'] {
  width: 800px;
}
select {
  width: 100px;
}
textarea {
  width: 100%;
  height: 200px;
}
</style>