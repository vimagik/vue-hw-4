import { ref } from "vue"

export default function useGetProduct() { 
    const data = ref(null)
    const error = ref(null)
    const filteredData = ref(null)

    fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((json) => {
      data.value = json
      filteredData.value = json
    })
        .catch((err) => (error.value = err))
    
    return {data, filteredData}
}