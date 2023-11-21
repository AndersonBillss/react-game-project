import Image from 'next/image'
import styles from './page.module.css'

import MasterMind from './games/MasterMind'
import Checkers from './games/Checkers'
import BackgroundImageGallery from './background-image-gallery'

export default function Home() {
  return (
    <main>
      <BackgroundImageGallery />
    </main>
  )
}
