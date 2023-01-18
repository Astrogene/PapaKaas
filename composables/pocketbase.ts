import PocketBase from 'pocketbase'

const pocketBase = new PocketBase('127.0.0.0:8090')

const usePocketBase = () => {
    return pocketBase
}