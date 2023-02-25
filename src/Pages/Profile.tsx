import Information from './Profile/Information'
import Password from './Profile/Password'

export default function Profile() {
  return (
    <div className="grid gap-4 grid-cols-12">
      <Information />
      <Password />
    </div>
  )
}