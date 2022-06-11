<template>
  <div>
    <div
      class="history"
    >
      <div
        v-for="(req, i) in history" 
        :key="req.created"
        class="-request"
      >
        <div class="-title">
          <h2>{{ req.url }}</h2>
          <div class="-actions">
            <a
              @click.prevent="del(i)"
            >
              Delete
            </a>
            <a
              @click.prevent="refresh(req)"
            >
              Refresh
            </a>
          </div>
        </div>
        <p>{{ req.method }}</p>
        <pre
          v-if="['post'].includes(req.method)"
          v-html="JSON.stringify(req.data)"
        ></pre>
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
            {{ req.error }}
          </h3>
          <p>Response data:</p>
          <pre
            v-if="req.response !== null"
            v-html="req.stringResponseData()"
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
  mounted() {
    const history = window.localStorage.getItem('history')
    if (history) {
      JSON.parse(history).forEach((reqData) => {
        const req = new Request()
        req.repopulate(reqData)
        this.history.push(req)
      })
    }
  },
  methods: {
    submit() {
      const req = reactive(new Request())
      req.populate(this.newUrl, this.newMethod, this.newData)
      req.send(() => {
        window.localStorage.setItem('history', JSON.stringify(this.history))
      })
      this.history.push(req)
    },
    del(i) {
      this.history.splice(i, 1)
      window.localStorage.setItem('history', JSON.stringify(this.history))
    },
    refresh(req) {
      req.error = null
      req.send(() => {
        window.localStorage.setItem('history', JSON.stringify(this.history))
      })
    },
  },
}
</script>

<style>
h2 {
  font-family: monospace;
}
h3, p, a {
  font-family: sans-serif;
}
.history {
}
.history .-request {
  margin-bottom: 50px;
  max-width: 1000px;
}
.history .-request .-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.history .-request .-title h2 {
  display: inline-block;
  margin: 0;
}
.history .-request .-title .-actions {
  display: inline-flex;
  gap: 16px;
  user-select: none;
}
.history .-request .-title .-actions a {
  display: inline-block;
  padding: 0.5em 0 0.5em 0.2em;
  text-underline-offset: 0.3em;
  opacity: 0.6;
  transition: opacity 0.2s linear;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-thickness: 0.5px;
}
.history .-request .-title .-actions a:hover {
  display: inline-block;
  padding: 0.5em 0 0.5em 0.2em;
  opacity: 1;
}
button {
  padding: 0.7em 2em;
  border-radius: 0.3em;
  background-color: #e96f0a;
  color: #fff;
  border: none;
}
.new-request {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  max-width: 1000px;
  height: 500px;
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