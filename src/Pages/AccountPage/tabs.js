const BASE_URL = '/dashboard/account'

export default [
  {
    text: "Login & Security",
    url: `${BASE_URL}?t=security`
  },
  {
    text: "Greeting Message",
    url: `${BASE_URL}?t=default_message`
  },
  {
    text: "Recurring Message",
    url: `${BASE_URL}?t=alt_message`
  },
  {
    text: "Integrations",
    url: `${BASE_URL}?t=integrations`
  }
]