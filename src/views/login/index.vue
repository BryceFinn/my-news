<script lang="ts" setup>
import { getCaptchaApi } from '@/api/login'
import { type LoginRequestData } from '@/api/login/types/login'
import ThemeSwitch from '@/components/ThemeSwitch/index.vue'
import { useUserStore } from '@/store/modules/user'
import { Key, Loading, Lock, Picture, User } from '@element-plus/icons-vue'
import { type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Owl from './components/Owl.vue'
import { useFocus } from './hooks/useFocus'

const router = useRouter()
const { isFocus, handleBlur, handleFocus } = useFocus()

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)
/** 登录按钮 Loading */
const loading = ref(false)
/** 验证码图片 URL */
const captchaSrc = ref('')
/** 登录表单数据 */
const loginFormData: LoginRequestData = reactive({
  username: '',
  password: '',
  captcha: ''
})
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
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

function goToRegister() {
  router.push({ path: '/register' })
}
/** 登录逻辑 */
const handleLogin = () => {
  // 校验表单数据是否通过验证
  loginFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      // 设置按钮 Loading 为 true
      loading.value = true
      // 使用用户 STORE 中的 login 方法登陆
      useUserStore()
        .login(loginFormData)
        .then(() => {
          // 登陆成功，跳转到首页
          router.push({ path: '/' })
        })
        .catch(() => {
          // 登陆失败，重新生成验证码并清空密码
          createCode()
          loginFormData.password = ''
        })
        .finally(() => {
          // 设置按钮 Loading 为 false
          loading.value = false
        })
    } else {
      // 校验失败，打印错误信息
      console.error('表单校验不通过', fields)
    }
  })
}
/** 创建验证码 */
const createCode = () => {
  // 先清空验证码的输入
  loginFormData.captcha = ''
  // 获取验证码
  captchaSrc.value = ''
  getCaptchaApi().then((res) => {
    captchaSrc.value = res.data
  })
}

/** 初始化验证码 */
createCode()
</script>

<template>
  <div class="login-container">
    <ThemeSwitch class="theme-switch" />
    <Owl :close-eyes="isFocus" />
    <div class="login-card">
      <div class="title">
        <img src="@/assets/layouts/logo-text-2.png" />
      </div>
      <div class="content">
        <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginFormData.username"
              placeholder="邮箱"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginFormData.password"
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
              v-model.trim="loginFormData.captcha"
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
            <el-button :loading="loading" type="primary" size="default" @click.prevent="handleLogin">登 录</el-button>
            <el-button :loading="loading" type="danger" size="default" @click="goToRegister">注 册</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
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
  .login-card {
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
