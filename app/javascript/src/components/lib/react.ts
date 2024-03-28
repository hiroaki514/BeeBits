import { rewrap } from '@sonicgarden/rewrap'
import { HelloReact } from '../components/HelloReact'

export const initReact = (): void => {
  rewrap('hello-react', HelloReact)
}
