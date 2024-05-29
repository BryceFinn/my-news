<script lang="ts" setup>
import { getCaptchaApi } from '@/api/login'
import { type RegisterFormData } from '@/api/register/types/register'
import ThemeSwitch from '@/components/ThemeSwitch/index.vue'
import { useUserStore } from '@/store/modules/user'
import { Avatar, Key, Loading, Lock, Picture, User } from '@element-plus/icons-vue'
import { FormInstance, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFocus } from './hooks/useFocus'

const router = useRouter()
const { isFocus, handleBlur, handleFocus } = useFocus()

const registerFormRef = ref<FormInstance | null>(null)
const registerFormData: RegisterFormData = reactive({
  alias: '',
  username: '',
  password_input: '',
  password_check: '',
  captcha: ''
})
const loading = ref(false)
const captchaSrc = ref('')

const registerFormRules: FormRules = {
  alias: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
  ],
  password_input: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
  ],
  password_check: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}

function validatePassword(rule: any, value: string, callback: any) {
  if (value !== registerFormData.password_input) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const resetRegisterForm = () => {
  registerFormRef.value?.resetFields()
}

const goToLogin = () => {
  resetRegisterForm()
  router.push({ path: '/login' })
}

const handleRegister = () => {
  loading.value = true
  registerFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      const registerRequestData = {
        alias: registerFormData.alias,
        username: registerFormData.username,
        password: registerFormData.password_check,
        captcha: registerFormData.captcha
      }
      useUserStore()
        .register(registerRequestData)
        .then(() => {
          router.push({ path: '/login' })
        })
        .catch(() => {
          resetRegisterForm()
          createCode()
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.error('表单校验不通过', fields)
      loading.value = false
    }
  })
}

const createCode = () => {
  // 先清空验证码的输入
  registerFormData.captcha = ''
  // 获取验证码
  captchaSrc.value = ''
  getCaptchaApi().then((res: { data: string }) => {
    captchaSrc.value = res.data
  })
}

createCode()
</script>

<template>
  <div class="register-container">
    <ThemeSwitch class="theme-switch" />
    <Owl :close-eyes="isFocus" />
    <div class="register-card">
      <div class="title">
        <img src="@/assets/layouts/logo-text-2.png" />
      </div>
      <div class="content">
        <el-form
          ref="registerFormRef"
          :model="registerFormData"
          :rules="registerFormRules"
          @keyup.enter="handleRegister"
        >
          <el-form-item prop="alias">
            <el-input
              v-model.trim="registerFormData.alias"
              placeholder="昵称"
              type="text"
              tabindex="1"
              :prefix-icon="Avatar"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              v-model.trim="registerFormData.username"
              placeholder="邮箱"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password_input">
            <el-input
              v-model.trim="registerFormData.password_input"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
              @blur="handleBlur"
              @focus="handleFocus"
            />
          </el-form-item>
          <el-form-item prop="password_check">
            <el-input
              v-model.trim="registerFormData.password_check"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
              @blur="handleBlur"
              @focus="handleFocus"
            />
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input
              v-model.trim="registerFormData.captcha"
              placeholder="验证码"
              type="text"
              tabindex="3"
              :prefix-icon="Key"
              maxlength="7"
              size="large"
            >
              <template #append>
                <el-image :src="captchaSrc" @click="createCode" draggable="false">
                  <template #placeholder>
                    <el-icon>
                      <Picture />
                    </el-icon>
                  </template>
                  <template #error>
                    <el-icon>
                      <Loading />
                    </el-icon>
                  </template>
                </el-image>
              </template>
            </el-input>
          </el-form-item>
          <div class="my-button-container">
            <el-button :loading="loading" type="danger" size="default" @click="handleRegister">注 册</el-button>
            <el-button :loading="loading" type="primary" size="default" @click="goToLogin">登 录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .register-card {
    width: 480px;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: var(--el-bg-color);
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .my-button-container {
        display: flex;
        justify-content: space-between;
        align-items: center; /* 垂直居中对齐 */
        width: 100%; /* 容器宽度为100% */
        margin-top: 10px; /* 容器顶部边距 */
        .el-button {
          width: 50%;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
