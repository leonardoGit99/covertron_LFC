import Spinner from '@/components/shared/Spinner'
import React from 'react'

function loading() {
  return (
    <Spinner text='Cargando producto(s), espere un momento por favor...'/>
  )
}

export default loading