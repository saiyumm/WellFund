import abi from '../abis/src/contracts/WellFund.sol/WellFund.json'
import address from '../abis/contractAddress.json'
import { getGlobalState, setGlobalState } from '../store'
import { ethers } from 'ethers'

const { ethereum } = window                 // load ethereum object from window
const contractAddress = address. address
const contractAbi = abi.abi
let tx


// function that enable us to connect wallet
const connectWallet = async () => {
    try{
        if(!ethereum) return alert('Please install MetaMask')
        const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    }   catch (error) {
        reportError(error)
    }
}


// function to check wallet is connected or not and also keep a connection with it
const isWalletConnected = async () => {
    try{
        if(!ethereum) return alert('Please install MetaMask')
        const accounts = await ethereum.request({ method: 'eth_accounts'})
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())

        // if network/chain changes -> reload entire application
        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload()
        })
        
        // if account changes -> recheck
        window.ethereum.on('accountsChanged', async () => {
            setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
            await isWalletConnected()
        })

        if(accounts.length) {
            setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
        } else {
            alert('Please connect Wallet.')
            console.log('No accounts found.')
        }
    }   catch (error) {
        reportError(error)
    }
}

// to get the contract **
const getEthereumContract = async () => {
    const connectedAccount = getGlobalState('connectedAccount')

    if (connectedAccount) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractAbi, signer)

        return contract
    } else {
        return getGlobalState('contract')
    }
}

// create project and feed details
const createProject = async ({
    title,
    description,
    imageURL,
    cost,
    expiresAt,
  }) => {
    try {
      if (!ethereum) return alert('Please install Metamask')
  
      const contract = await getEthereumContract()
      cost = ethers.utils.parseEther(cost)
      tx = await contract.createProject(title, description, imageURL, cost, expiresAt)
    } catch (error) {
      reportError(error)
    }
  }


// function to extract and retrive projects
const loadProjects = async () => {
    try{
        if (!ethereum) return alert('Please install MetaMask')

        const contract = await getEthereumContract()            // grab contract
        const projects = await contract.getProjects()           // get project
        const stats = await contract.stats()                    // get stats of project

        setGlobalState('stats', structureStats(stats))
        setGlobalState('projects', structuredProjects(projects))
    } catch (error) {
        reportError(error)
    }
}


// function to structure project data while storing in array
const structuredProjects = (projects) =>
  projects
    .map((project) => ({
      id: project.id.toNumber(),
      owner: project.owner.toLowerCase(),
      title: project.title,
      description: project.description,
      timestamp: new Date(project.timestamp.toNumber()).getTime(),
      expiresAt: new Date(project.expiresAt.toNumber()).getTime(),
      date: toDate(project.expiresAt.toNumber() * 1000),
      imageURL: project.imageURL,
      raised: parseInt(project.raised._hex) / 10 ** 18,
      cost: parseInt(project.cost._hex) / 10 ** 18,
      backers: project.backers.toNumber(),
      status: project.status,
    }))
    .reverse()

// function that takes a timestamp and convert it to a date string
const toDate = (timestamp) => {
    const date = new Date(timestamp)
    const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    const mm = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    const yyyy = date.getFullYear()
    return `${yyyy}-${mm}${dd}`
}


// to check that data is in right data type
const structureStats = (stats) => ({
    totalProjects: stats.totalProjects.toNumber(),
    totalBackings: stats.totalBacking.toNumber(),
    totalDonations: parseInt(stats.totalDonations._hex) / 10 ** 18,
})


// if there is no ethereum object - throw this error
const reportError = (error) => {
    console.log(error.message)
    throw new Error('No ethereum object.')
}


// exporting functions
export {
    connectWallet,
    isWalletConnected,
    createProject,
    loadProjects
}