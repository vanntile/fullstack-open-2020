import data from '../../data/patients.json'
import { SafePatient, Patient } from '../types'

const patients = data as Patient[]

const getEntries = (): SafePatient[] => {
  return patients.map((d) => ({ ...d, ssn: undefined }))
}

const addEntry = (patient: Omit<SafePatient, 'id'>): SafePatient | null => {
  const newPatient: SafePatient = {
    id: `${data.length + 1}`,
    ...patient,
  }
  patients.push(newPatient)

  return newPatient
}

export default {
  getEntries,
  addEntry,
}
