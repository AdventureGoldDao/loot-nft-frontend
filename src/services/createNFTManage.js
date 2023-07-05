import { useState, useEffect } from 'react';
import http from '../utils/http';

export const saveCollection = async (formData) => {
  let res = await http.put(`/collections`, formData)
  return res
}
export const delCollection = async (collectionId) => {
  let res = await http.delete(`/collections/${collectionId}`)
  return res
}
export const queryCollectionDetail = async (collectionId) => {
  let res = await http.get(`/collections/${collectionId}`)
  return res
}
export const publishCollection = async (collectionId,mintStartTime,mintEndTime,chainType,contractAddress,txHash,blockNumber) => {
  let res = await http.put(`/collections/${collectionId}/publish?mintStartTime=${mintStartTime}&mintEndTime=${mintEndTime}&chainType=${chainType}&contractAddress=${contractAddress}&txHash=${txHash}&blockNumber=${blockNumber}`)
  return res
}
export const useCollectionList = (pageNo, pageSize, setLoading, status) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  const queryData = () => {
    if(pageNo===1){
      setLoading(true)
    }
    http.get(`/collections/published?pageNo=${pageNo}&pageSize=${pageSize}&status=${status}`).then(res => {
      if (pageNo === 1) {
        setList(res.list)
      } else {
        setList(oldList => [...oldList, ...res.list])
      }
      setTotal(res.totalCount)
      setLoading(false)
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      queryData()
    }, 10);
    return () => clearTimeout(timer);
  }, [pageNo, pageSize, status])

  return { list, total }
}
export const useOwnerCollectionList = (pageNo, pageSize, setLoading, status,refreshList) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  const queryData = () => {
    if(pageNo===1){
      setLoading(true)
    }
    http.get(`/collections/created?pageNo=${pageNo}&pageSize=${pageSize}&status=${status}`).then(res => {
      if (pageNo === 1) {
        setList(res.list)
      } else {
        setList(oldList => [...oldList, ...res.list])
      }
      setTotal(res.totalCount)
      setLoading(false)
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      queryData()
    }, 10);
    return () => clearTimeout(timer);
  }, [pageNo, pageSize, status,refreshList])
  return { list, total }
}
export const saveNFT = async (collectionId,formData) => {
  let res = await http.put(`/collections/${collectionId}/types`, formData)
  return res
}
export const delNFT  = async (collectionId,typeId) => {
  let res = await http.delete(`/collections/${collectionId}/types/${typeId}`)
  return res
}
export const useOwnerNFTList = (collectionId,pageNo, pageSize, setLoading,refreshList) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  const queryData = () => {
    if(pageNo===1){
      setLoading(true)
    }
    http.get(`/collections/${collectionId}/types?pageNo=${pageNo}&pageSize=${pageSize}`).then(res => {
      if (pageNo === 1) {
        setList(res.list)
      } else {
        setList(oldList => [...oldList, ...res.list])
      }
      setTotal(res.totalCount)
      setLoading(false)
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      queryData()
    }, 10);
    return () => clearTimeout(timer);
  }, [pageNo, pageSize,refreshList])
  return { list, total }
}

