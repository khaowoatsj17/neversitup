<template>
  <v-card flat>
    <v-toolbar color="#46768e" dark flat>
      <v-toolbar-title>Neversitup Test</v-toolbar-title>
      <v-spacer></v-spacer>
            <v-btn
              class="rounded-xl black--text"
              color="white"
              dark
              @click="Logout"
            >ออกจากระบบ</v-btn>
      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card flat v-if="item === 'ToDo'">
          <v-card-title>
            <v-toolbar-title>DOTO LIST</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              class="white--text rounded-xl"
              color="#46768e"
              dark
              @click="(dialog = true), (type = 'post')"
            >
              <v-icon>mdi-plus</v-icon>
              Create
            </v-btn>
          </v-card-title>
          <v-card-text>
            <DialogToDo
              :visible="dialog"
              :type="type"
              :info="type === 'post' ? infoCreate : $store.state.infoToDoByID"
              @close="close"
            />
            <v-row justify="center" align="center">
              <v-col
                cols="12"
                md="10"
                v-for="(todo, i) in infoAllToDo"
                :key="i"
              >
                <v-card class="rounded-xl" @click="updateTodo(todo._id)">
                  <v-card-title>{{ todo.title }}</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="9">{{ todo.description }}</v-col>
                      <v-col cols="12" md="3" align="end"
                        >updated : {{ todo.updatedAt }}</v-col
                      >
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card flat v-else>
          <v-card-title>
            <v-toolbar-title>Bonus</v-toolbar-title>
          </v-card-title>
          <v-card-text>
            <v-row justify="center" align="center">
              <v-col cols="12" md="4">
                <v-card height="100%"
                  ><v-card-text>Array 1 : {{ array1 }}</v-card-text>
                  <v-card-text>Array 2 : {{ array2 }}</v-card-text></v-card
                >
              </v-col>
              <v-col cols="12" md="2">
                <v-btn class="white--text rounded-xl" color="#46768e" dark @click="Filter">
                  Filter
                </v-btn>
                <v-btn class="rounded-xl" color="#46768e" outlined @click="filter= []">
                  clear
                </v-btn>
              </v-col>
              <v-col cols="12" md="4">
                <v-card height="100%"><v-card-text>{{filter}}</v-card-text></v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import DialogToDo from './dialog/DialogToDo'
export default {
  components: { DialogToDo },
  data () {
    return {
      dialog: false,
      type: 'post',
      tab: null,
      items: ['ToDo', 'Bonus'],
      infoCreate: {
        title: '',
        description: ''
      },
      array1: [1, 2, 3, 4, 5, 6],
      array2: [1, 2],
      filter: []
    }
  },
  created () {
    this.$store.dispatch('getAllToDo')
  },
  computed: {
    infoAllToDo () {
      return this.$store.state.infoAllToDo
    }
  },
  methods: {
    Filter () {
      const check = this.array1.filter((el) => {
        return this.array2.map((sel) => { return sel }).includes(el)
      })
      this.filter = check
    },
    updateTodo (id) {
      this.type = 'put'
      this.$store.dispatch('getToDoByID', id)
      this.dialog = true
    },
    close () {
      this.dialog = false
      this.infoCreate = {
        title: null,
        description: null
      }
    },
    Logout () {
      this.$cookies.remove('Token')
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style></style>
