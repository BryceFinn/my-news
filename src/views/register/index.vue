<script lang="ts" setup>
import { getCaptchaApi } from '@/api/login'
import { type RegisterRequestData } from '@/api/register/types/register'
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
const registerFormData: RegisterRequestData = reactive({
  alias: '',
  username: '',
  password: '',
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
    { type: 'string', message: '邮箱格式错误', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
  ],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}

const handleRegister = () => {
  registerFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      useUserStore()
        .register(registerFormData)
        .then(() => {
          router.push({ path: '/login' })
        })
        .catch(() => {
          createCode()
          registerFormData.password = ''
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.error('表单校验不通过', fields)
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
              placeholder="邮箱"
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
          <el-form-item prop="password">
            <el-input
              v-model.trim="registerFormData.password"
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
          <div class="button-container">
            <el-button :loading="loading" type="danger" size="default">注 册</el-button>
            <el-button :loading="loading" type="primary" size="default">登 录</el-button>
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
      .button-container {
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
