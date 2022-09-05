<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <v-dialog v-model="show" persistent max-width="500">
      <v-card>
        <v-card-title>
          <span v-if="type === 'post'">Add ToDo</span>
          <span v-if="type === 'put'">Update ToDo</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-row justify="center" no-gutters>
              <v-col cols="12" md="4">
                <v-card-text>หัวข้อ : </v-card-text>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="info.title"
                  label="หัวข้อ"
                  type="text"
                  solo
                  rounded
                  :rules="Rules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-card-text>รายละเอียด : </v-card-text>
              </v-col>
              <v-col cols="12" md="6"
                ><v-text-field
                  v-model="info.description"
                  label="รายละเอียด"
                  type="text"
                  solo
                  rounded
                  :rules="Rules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn class="rounded-xl" color="error" dark v-if="type === 'put'" @click="Delete(info)">
            <v-icon left>mdi-trash-can</v-icon>
            ลบ
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="rounded-xl"
            color="#46768e"
            dark
            outlined
            @click="Close"
          >
            ปิด
          </v-btn>
          <v-btn
            class="white--text rounded-xl"
            color="#46768e"
            dark
            @click="Save"
          >
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  props: ['visible', 'type', 'info'],
  data () {
    return {
      Rules: [(v) => !!v || 'กรุณากรอกข้อมูล.']
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    Close () {
      this.$refs.form.resetValidation()
      this.$refs.form.reset()
      this.$emit('close')
    },
    Save () {
      if (this.$refs.form.validate()) {
        if (this.type === 'post') {
          this.$store
            .dispatch('addToDo', this.info)
            .then(() => {
              Swal.fire({
                icon: 'success',
                text: 'ดำเนินการเรียบร้อยแล้ว',
                title: '',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.$store.dispatch('getAllToDo')
              })
            })
            .catch((err) => {
              const text = err
              Swal.fire({
                icon: 'error',
                text: text.data,
                title: 'ไม่สามารถดำเนินการได้'
              }).then(() => {
                this.$store.dispatch('getAllToDo')
              })
            })
        } else {
          this.$store
            .dispatch('editToDo', this.info)
            .then(() => {
              Swal.fire({
                icon: 'success',
                text: 'ดำเนินการเรียบร้อยแล้ว',
                title: '',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.$store.dispatch('getAllToDo')
              })
            })
            .catch((err) => {
              const text = err
              Swal.fire({
                icon: 'error',
                text: text.data,
                title: 'ไม่สามารถดำเนินการได้'
              }).then(() => {
                this.$store.dispatch('getAllToDo')
              })
            })
        }

        this.Close()
      }
    },
    Delete (data) {
      Swal.fire({
        title: 'ยืนยันการลบ ?',
        text: `ต้องการลบ : "${data.title}" ใช่หรือไม่`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#46768e',
        cancelButtonColor: '#C43434',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteToDo', data._id)
            .then(() => {
              Swal.fire({
                icon: 'success',
                text: 'ดำเนินการเรียบร้อยแล้ว',
                title: '',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.$store.dispatch('getAllToDo')
              })
            })
            .catch(() => {
              Swal.fire({
                icon: 'error',
                text: 'ไม่สามารถดำเนินการได้',
                title: ''
              }).then(() => {
                this.$store.dispatch('getAllToDo')
              })
            })
          this.Close()
        }
      })
    }
  }
}
</script>

<style></style>
