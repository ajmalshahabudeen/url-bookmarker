export const checkPassword = async () => {
  return $fetch('/api/user/userPassword', {
    method: 'GET',
  })
}

export const setPassword = async (password: string) => {
  return $fetch('/api/user/userPassword', {
    method: 'POST',
    body: {
      password
    }
  })
}