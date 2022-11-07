import { useState, useEffect } from "react";
import { projectFirestore } from '../firebase/config'

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  // Real Time Data for documents
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id)

    const unsubscribe = ref.onSnapshot((snapshot) => {
      if (snapshot.data()) {
        setDocument({ ...snapshot.data(), id: snapshot.id })
        setError(null)
      }
      else {
        setError('Este projeto não existe')
      }
    }, (err) => {
      console.log(err.message)
      setError('Não foi possível encontrar o documento')
    })

    return () => unsubscribe()

  }, [collection, id])

  return { document, error }
}