import React, { useEffect, useState } from 'react'
import {
  message,
  Tag,
  Modal,
  Button,
} from 'antd'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { db } from '@/config/firebase'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import styles from './index.module.less'
import AddMovieModal from './AddMovieModal'

interface IMoive {
  title: string;
  id: string;
  desc: string;
  date: number;
  author: string;
}

export default function FirebaseMovies() {

  const [movieList, setMovieList] = useState<IMoive[]>([])
  const [visible, setVisible] = useState(false)
  const movieCollectionRef = collection(db, 'movies')

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef)
      const result = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as IMoive[]

      setMovieList(result)
    } catch (error: any) {
      message.error(error.message)
    }
  }

  const deleteMovie = (id: string) => {
    Modal.error({
      title: '删除',
      content: '删除后无法恢复，是否要删除？',
      maskClosable: true,
      async onOk() {
        console.log('确定删除')
        try {
          const movieDoc = doc(db, 'movies', id)
          await deleteDoc(movieDoc)

          getMovieList()

          message.success('delete success!')
        } catch (error: any) {
          message.error(error.message)
        }
      },
      okText: '确定',
    })
  }

  const updateMovie = async (id: string) => {
    try {
      const movieDoc = doc(db, 'movies', id)
      await updateDoc(movieDoc, {
        date: Math.random()
      })

      getMovieList()
      message.success('update success!')
    } catch (error: any) {
      message.error(error.message)
    }
  }

  const addMovie = async (values: IMoive) => {
    try {
      await addDoc(movieCollectionRef, values)
      setVisible(false)
      getMovieList()
    } catch (error: any) {
      message.error(error.message)
    }
  }

  useEffect(() => {
    getMovieList()
  }, [])

  return (
    <div>
      <div className={styles.operations}>
        <Button type='primary' size='small' onClick={() => setVisible(true)}>添加</Button>
      </div>
      <p style={{ color: '#333', fontSize: '12px', fontWeight: 'bold' }}>为了简便操作，编辑 Movie 时，只是用了随机数更改了 Movie Date...</p>
      {
        movieList.map(movie => {
          return (
            <div className={styles.list} key={movie.id}>
              <DeleteFilled className={styles.deleteIcon} rev="" onClick={() => deleteMovie(movie.id)} />
              <EditFilled className={styles.editIcon} rev='' onClick={() => updateMovie(movie.id)} />
              <h1>
                <span style={{ marginRight: '6px' }}>{movie.title}</span>
                <Tag color="magenta">{movie.author}</Tag>
                <Tag color="green">{movie.date}</Tag>
              </h1>
              <p style={{ color: '#888' }}>{movie.desc}</p>
            </div>
          )
        })
      }
      <AddMovieModal visible={visible} setVisible={setVisible} addMovie={addMovie} />
    </div>
  )
}

