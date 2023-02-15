export interface State {
  open: {
    sidebar: boolean
    dropdown: boolean
  }
  theme: 'primary'|'secondary'|'success'|'danger'|'info'|'warning'|'yellow'|'dark'|'light'
}