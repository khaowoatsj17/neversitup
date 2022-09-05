<template>
  <v-container>
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" md="4">
          <v-card class="elevation-12 pa-5">
            <v-card-text>
              <v-row align="center" justify="center" class="pb-6">
                <v-card-title>
                  <v-icon large left color="#46768e">mdi-account-circle</v-icon>
                  <span>เข้าสู่ระบบ</span>
                </v-card-title>
              </v-row>
              <v-alert
                class="ml-6"
                v-if="alert"
                border="right"
                colored-border
                type="error"
                elevation="2"
                >รหัสผ่านหรือชื่อผู้ใช้ผิดพลาด</v-alert
              >
              <v-form ref="form">
                <v-text-field
                  v-model="username"
                  label="ชื่อผู้ใช้"
                  type="text"
                  solo
                  rounded
                  @focus="(alert = false), (allow = false)"
                  v-on:keyup.enter="Login"
                  :rules="UsernameRules"
                >
                  <template #prepend-inner>
                    <v-icon class="mr-3" color="#46768e">mdi-account</v-icon>
                  </template></v-text-field
                >
                <v-text-field
                  v-model="password"
                  label="รหัสผ่าน"
                  solo
                  rounded
                  @focus="(alert = false), (allow = false)"
                  :rules="PasswordRules"
                  :type="showPass ? 'text' : 'password'"
                  :append-icon="showPass ? 'mdi-eye-outline' : 'mdi-eye-off'"
                  @click:append="showPass = !showPass"
                  v-on:keyup.enter="Login"
                >
                  <template #prepend-inner>
                    <v-icon class="mr-3" color="#46768e">mdi-lock</v-icon>
                  </template></v-text-field
                >
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-row class="justify-center">
                <v-col cols="12" md="10" class="px-0">
                  <v-btn
                    class="white--text rounded-xl"
                    block
                    x-large
                    color="#46768e"
                    dark
                    @click="Login"
                  >
                    เข้าสู่ระบบ
                  </v-btn>
                </v-col>
                <v-col cols="12" md="10">
                  <v-btn
                    class="text-decoration-underline"
                    width="100%"
                    text
                    @click="Register"
                  >
                    ลงทะเบียน
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    alert: false,
    showPass: false,
    username: '',
    password: '',
    UsernameRules: [(v) => !!v || 'กรุณากรอก Username.'],
    PasswordRules: [(v) => !!v || 'กรุณากรอก Password.']
  }),
  methods: {
    Register () {
      window.open('https://nevers-todo-register.firebaseapp.com/')
    },
    Login () {
      if (this.$refs.form.validate()) {
        this.$axios
          .post('https://candidate.neversitup.com/todo/users/auth', {
            username: this.username,
            password: this.password
          })
          .then((req) => {
            this.$cookies.set('Token', req.data.token)
            this.$router.push({ path: '/todolist' })
          })
          .catch((error) => {
            this.alert = true
            console.log(error.message)
          })
      }
    }
  }
}
</script>
