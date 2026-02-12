<template>
  <div class="form-container">
    <div class="form-wrapper">
      <h1 class="main-title">Vul je gegevens in om je booking compleet te maken.</h1>

      <!-- Participants Summary -->
      <div class="participants-summary">
        <div class="summary-content">
          <h2>Deelnemers</h2>
          <p>Je gaat boeken voor <strong>{{ participants.length }} volwassenen</strong>.</p>
        </div>
        <button type="button" @click="toggleParticipantManager" class="adjust-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="edit-icon">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Aanpassen
        </button>
      </div>

      <!-- Participant Manager Modal -->
      <div v-if="showParticipantManager" class="modal-overlay" @click="toggleParticipantManager">
        <div class="modal-content" @click.stop>
          <h3>Aantal deelnemers aanpassen</h3>
          <div class="participant-counter">
            <label>Aantal volwassenen:</label>
            <div class="counter-controls">
              <button type="button" @click="decreaseParticipants" :disabled="participants.length <= 1">-</button>
              <span>{{ participants.length }}</span>
              <button type="button" @click="increaseParticipants">+</button>
            </div>
          </div>
          <button type="button" @click="toggleParticipantManager" class="close-modal-btn">Sluiten</button>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="clean-form" novalidate>
        <!-- Main Person Section -->
        <div class="section-card">
          <h3>Mijn gegevens</h3>
          
          <div class="form-group">
            <div class="radio-group">
              <label class="radio-label">
                <input 
                  type="radio" 
                  :checked="mainPerson.gender === 'man'"
                  @change="updateMainPersonField('gender', 'man')"
                />
                <span>Man</span>
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  :checked="mainPerson.gender === 'vrouw'"
                  @change="updateMainPersonField('gender', 'vrouw')"
                />
                <span>Vrouw</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label for="firstname">Voornaam</label>
            <Field
              name="firstname"
              :modelValue="mainPerson.firstname"
              @update:modelValue="updateMainPersonField('firstname', $event)"
              :rules="validateFirstname"
              v-slot="{ field, errors }"
            >
              <input
                v-bind="field"
                id="firstname"
                type="text"
                placeholder="Voornaam"
                :class="{ 'error': errors.length > 0 }"
              />
            </Field>
            <ErrorMessage name="firstname" class="error-message" />
          </div>

          <div class="form-group">
            <label for="lastname">Achternaam</label>
            <input
              id="lastname"
              :value="mainPerson.lastname"
              @input="updateMainPersonField('lastname', $event.target.value)"
              @blur="validateField('mainPerson', 'lastname')"
              type="text"
              placeholder="Achternaam"
              :class="{ 'error': fieldErrors.mainPerson?.lastname }"
            />
            <span v-if="fieldErrors.mainPerson?.lastname" class="error-message">{{ fieldErrors.mainPerson.lastname }}</span>
          </div>

          <div class="form-group">
            <label for="birthdate">Geboortedatum</label>
            <Field
              name="birthdate"
              :modelValue="mainPerson.birthdate"
              @update:modelValue="updateMainPersonField('birthdate', $event)"
              :rules="validateBirthdate"
              v-slot="{ field, errors }"
            >
              <input
                v-bind="field"
                id="birthdate"
                type="text"
                placeholder="DD-MM-JJJJ"
                :class="{ 'error': errors.length > 0 }"
              />
            </Field>
            <ErrorMessage name="birthdate" class="error-message" />
          </div>

          <div class="form-group">
            <label for="nationality">Nationaliteit</label>
            <select 
              id="nationality" 
              :value="mainPerson.nationality"
              @change="updateMainPersonField('nationality', $event.target.value)"
            >
              <option value="nederlands">Nederlands</option>
              <option value="belgisch">Belgisch</option>
              <option value="duits">Duits</option>
              <option value="frans">Frans</option>
              <option value="anders">Anders</option>
            </select>
          </div>

          <div class="form-group">
            <label for="country">Land</label>
            <select 
              id="country" 
              :value="mainPerson.country"
              @change="updateMainPersonField('country', $event.target.value)"
            >
              <option value="nederland">Nederland</option>
              <option value="belgie">België</option>
              <option value="duitsland">Duitsland</option>
              <option value="frankrijk">Frankrijk</option>
              <option value="anders">Anders</option>
            </select>
          </div>

          <div class="address-row">
            <div class="form-group">
              <label for="postcode">Postcode</label>
              <input
                id="postcode"
                :value="mainPerson.postcode"
                @input="updateMainPersonField('postcode', $event.target.value)"
                @blur="validateField('mainPerson', 'postcode')"
                type="text"
                placeholder="1111"
                :class="{ 'error': fieldErrors.mainPerson?.postcode }"
              />
              <span v-if="fieldErrors.mainPerson?.postcode" class="error-message">{{ fieldErrors.mainPerson.postcode }}</span>
            </div>
            <div class="form-group">
              <label for="housenumber">Huisnummer</label>
              <input
                id="housenumber"
                :value="mainPerson.housenumber"
                @input="updateMainPersonField('housenumber', $event.target.value)"
                @blur="validateField('mainPerson', 'housenumber')"
                type="text"
                placeholder="12"
                :class="{ 'error': fieldErrors.mainPerson?.housenumber }"
              />
              <span v-if="fieldErrors.mainPerson?.housenumber" class="error-message">{{ fieldErrors.mainPerson.housenumber }}</span>
            </div>
            <div class="form-group">
              <label for="addition">Toevoeging <span class="optional">(optioneel)</span></label>
              <input
                id="addition"
                :value="mainPerson.addition"
                @input="updateMainPersonField('addition', $event.target.value)"
                type="text"
                placeholder="B"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="address-label">Straat, Plaats</label>
            <div v-if="addressInfo" class="address-display">
              {{ addressInfo }}
            </div>
            <div v-else-if="isLoadingAddress" class="address-loading">
              Ophalen adres...
            </div>
            <div v-else class="address-placeholder">
              Wordt automatisch ingevuld
            </div>
          </div>

          <div class="form-group">
            <label for="phone">Telefoon</label>
            <input
              id="phone"
              :value="mainPerson.phone"
              @input="updateMainPersonField('phone', $event.target.value)"
              @blur="validateField('mainPerson', 'phone')"
              type="tel"
              placeholder="Telefoonnummer"
              :class="{ 'error': fieldErrors.mainPerson?.phone }"
            />
            <span v-if="fieldErrors.mainPerson?.phone" class="error-message">{{ fieldErrors.mainPerson.phone }}</span>
          </div>

          <div class="form-group">
            <label for="email">E-mailadres</label>
            <input
              id="email"
              :value="mainPerson.email"
              @input="updateMainPersonField('email', $event.target.value)"
              @blur="validateField('mainPerson', 'email')"
              type="email"
              placeholder="E-mailadres"
              :class="{ 'error': fieldErrors.mainPerson?.email }"
            />
            <span v-if="fieldErrors.mainPerson?.email" class="error-message">{{ fieldErrors.mainPerson.email }}</span>
          </div>

          <div class="checkbox-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                :checked="mainPerson.alsoParticipant"
                @change="updateMainPersonField('alsoParticipant', $event.target.checked)"
              />
              <span>Ik ben ook de deelnemer</span>
            </label>
          </div>
        </div>

        <!-- Participant Forms -->
        <ParticipantForm
          v-for="(participant, index) in participants"
          :key="participant.id"
          :participant="participant"
          :participantNumber="index + 1"
          :showRemove="participants.length > 1"
          :errors="fieldErrors.participants[index]"
          @update="(updates) => handleParticipantUpdate(index, updates)"
          @remove="handleRemoveParticipant(index)"
          @validate="(field) => validateParticipantField(index, field)"
        />

        <button type="submit" :disabled="isSubmitting" class="submit-btn">
          {{ isSubmitting ? 'Verzenden...' : 'Volgende' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
import ParticipantForm from './ParticipantForm.vue'

const props = defineProps({
  mainPerson: {
    type: Object,
    required: true
  },
  participants: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['next', 'update:mainPerson', 'update:participant', 'add-participant', 'remove-participant'])

const isSubmitting = ref(false)
const showParticipantManager = ref(false)
const addressInfo = ref('')
const isLoadingAddress = ref(false)
const fieldErrors = ref({
  mainPerson: {},
  participants: {}
})

const toggleParticipantManager = () => {
  showParticipantManager.value = !showParticipantManager.value
}

const increaseParticipants = () => {
  emit('add-participant')
}

const decreaseParticipants = () => {
  if (props.participants.length > 1) {
    emit('remove-participant', props.participants.length - 1)
  }
}

const updateMainPersonField = (field, value) => {
  emit('update:mainPerson', { [field]: value })
}

const lookupAddress = async (postcode, housenumber) => {
  // Clean up postcode (remove spaces)
  const cleanPostcode = postcode.replace(/\s/g, '')
  
  // Basic validation for Dutch postcode format (1234AB)
  if (!/^[1-9][0-9]{3}[a-zA-Z]{2}$/.test(cleanPostcode) || !housenumber) {
    addressInfo.value = ''
    return
  }

  isLoadingAddress.value = true
  
  try {
    const response = await fetch(
      `https://postcode.tech/api/v1/postcode/full?postcode=${cleanPostcode}&number=${housenumber}`
    )
    
    if (response.ok) {
      const data = await response.json()
      if (data.street && data.city) {
        addressInfo.value = `${data.street}, ${data.city}`
      } else {
        addressInfo.value = ''
      }
    } else {
      addressInfo.value = ''
    }
  } catch (error) {
    console.error('Error fetching address:', error)
    addressInfo.value = ''
  } finally {
    isLoadingAddress.value = false
  }
}

// Watch for changes in postcode and housenumber
watch(
  () => [props.mainPerson.postcode, props.mainPerson.housenumber],
  ([newPostcode, newHousenumber]) => {
    if (newPostcode && newHousenumber) {
      lookupAddress(newPostcode, newHousenumber)
    } else {
      addressInfo.value = ''
    }
  }
)

const handleParticipantUpdate = (index, updates) => {
  emit('update:participant', index, updates)
}

const handleRemoveParticipant = (index) => {
  emit('remove-participant', index)
}

// Date validation helper
const isValidDate = (dateString) => {
  if (!dateString) return false
  const pattern = /^(\d{2})-(\d{2})-(\d{4})$/
  const match = dateString.match(pattern)
  if (!match) return false
  
  const day = parseInt(match[1], 10)
  const month = parseInt(match[2], 10)
  const year = parseInt(match[3], 10)
  
  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false
  if (year < 1900 || year > new Date().getFullYear()) return false
  
  // Check for valid day in month
  const date = new Date(year, month - 1, day)
  return date.getFullYear() === year && 
         date.getMonth() === month - 1 && 
         date.getDate() === day
}

// VeeValidate validation function for firstname
const validateFirstname = (value) => {
  if (!value || !value.trim()) {
    return 'Vul je voornaam in'
  }
  return true // Validation passed
}

// VeeValidate validation function for birthdate
const validateBirthdate = (value) => {
  if (!value || !value.trim()) {
    return 'Vul je geboortedatum in (DD-MM-JJJJ)'
  }
  if (!isValidDate(value)) {
    return 'Vul je correcte geboortedatum in (DD-MM-JJJJ)'
  }
  return true // Validation passed
}

// These are for alle the errors if the user doesn't fill in the form correctly or forgets to fill in a field.
const validateField = (personType, fieldName) => {
  if (personType === 'mainPerson') {
    const value = props.mainPerson[fieldName]
    
    if (fieldName === 'firstname') {
      fieldErrors.value.mainPerson.firstname = !value?.trim() ? 'Vul je voornaam in' : ''
    } else if (fieldName === 'lastname') {
      fieldErrors.value.mainPerson.lastname = !value?.trim() ? 'Vul je achternaam in' : ''
    } else if (fieldName === 'birthdate') {
      if (!value?.trim()) {
        fieldErrors.value.mainPerson.birthdate = 'Vul je geboortedatum in (DD-MM-JJJJ)'
      } else if (!isValidDate(value)) {
        fieldErrors.value.mainPerson.birthdate = 'Vul je correcte geboortedatum in (DD-MM-JJJJ)'
      } else {
        fieldErrors.value.mainPerson.birthdate = ''
      }
    } else if (fieldName === 'postcode') {
      fieldErrors.value.mainPerson.postcode = !value?.trim() ? 'Vul je postcode in' : ''
    } else if (fieldName === 'housenumber') {
      fieldErrors.value.mainPerson.housenumber = !value?.trim() ? 'Vul je huisnummer in' : ''
    } else if (fieldName === 'phone') {
      fieldErrors.value.mainPerson.phone = !value?.trim() ? 'Vul je telefoonnummer in' : ''
    } else if (fieldName === 'email') {
      if (!value?.trim()) {
        fieldErrors.value.mainPerson.email = 'Vul je e-mailadres in'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        fieldErrors.value.mainPerson.email = 'Vul een geldig e-mailadres in'
      } else {
        fieldErrors.value.mainPerson.email = ''
      }
    }
  }
}

// Similar validation for participant fields
const validateParticipantField = (index, fieldName) => {
  if (!fieldErrors.value.participants[index]) {
    fieldErrors.value.participants[index] = {}
  }
  
  const participant = props.participants[index]
  const value = participant[fieldName]
  
  if (fieldName === 'firstname') {
    fieldErrors.value.participants[index].firstname = !value?.trim() ? 'Vul je voornaam in' : ''
  } else if (fieldName === 'lastname') {
    fieldErrors.value.participants[index].lastname = !value?.trim() ? 'Vul je achternaam in' : ''
  } else if (fieldName === 'birthdate') {
    if (!value?.trim()) {
      fieldErrors.value.participants[index].birthdate = 'Vul je geboortedatum in (DD-MM-JJJJ)'
    } else if (!isValidDate(value)) {
      fieldErrors.value.participants[index].birthdate = 'Vul je correcte geboortedatum in (DD-MM-JJJJ)'
    } else {
      fieldErrors.value.participants[index].birthdate = ''
    }
  } else if (fieldName === 'postcode') {
    fieldErrors.value.participants[index].postcode = !value?.trim() ? 'Vul je postcode in' : ''
  } else if (fieldName === 'housenumber') {
    fieldErrors.value.participants[index].housenumber = !value?.trim() ? 'Vul je huisnummer in' : ''
  } else if (fieldName === 'phone') {
    fieldErrors.value.participants[index].phone = !value?.trim() ? 'Vul je telefoonnummer in' : ''
  } else if (fieldName === 'email') {
    if (!value?.trim()) {
      fieldErrors.value.participants[index].email = 'Vul je e-mailadres in'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      fieldErrors.value.participants[index].email = 'Vul een geldig e-mailadres in'
    } else {
      fieldErrors.value.participants[index].email = ''
    }
  }
}

const validateAllFields = () => {
  let isValid = true
  
  // Validate main person
  if (!props.mainPerson.firstname?.trim()) {
    fieldErrors.value.mainPerson.firstname = 'Vul je voornaam in'
    isValid = false
  }
  if (!props.mainPerson.lastname?.trim()) {
    fieldErrors.value.mainPerson.lastname = 'Vul je achternaam in'
    isValid = false
  }
  if (!props.mainPerson.birthdate?.trim()) {
    fieldErrors.value.mainPerson.birthdate = 'Vul je geboortedatum in (DD-MM-JJJJ)'
    isValid = false
  } else if (!isValidDate(props.mainPerson.birthdate)) {
    fieldErrors.value.mainPerson.birthdate = 'Vul je correcte geboortedatum in (DD-MM-JJJJ)'
    isValid = false
  }
  if (!props.mainPerson.postcode?.trim()) {
    fieldErrors.value.mainPerson.postcode = 'Vul je postcode in'
    isValid = false
  }
  if (!props.mainPerson.housenumber?.trim()) {
    fieldErrors.value.mainPerson.housenumber = 'Vul je huisnummer in'
    isValid = false
  }
  if (!props.mainPerson.phone?.trim()) {
    fieldErrors.value.mainPerson.phone = 'Vul je telefoonnummer in'
    isValid = false
  }
  if (!props.mainPerson.email?.trim()) {
    fieldErrors.value.mainPerson.email = 'Vul je e-mailadres in'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.mainPerson.email)) {
    fieldErrors.value.mainPerson.email = 'Vul een geldig e-mailadres in'
    isValid = false
  }
  
  // Validate participants
  props.participants.forEach((participant, index) => {
    if (!fieldErrors.value.participants[index]) {
      fieldErrors.value.participants[index] = {}
    }
    
    if (!participant.firstname?.trim()) {
      fieldErrors.value.participants[index].firstname = 'Vul je voornaam in'
      isValid = false
    }
    if (!participant.lastname?.trim()) {
      fieldErrors.value.participants[index].lastname = 'Vul je achternaam in'
      isValid = false
    }
    if (!participant.birthdate?.trim()) {
      fieldErrors.value.participants[index].birthdate = 'Vul je geboortedatum in (DD-MM-JJJJ)'
      isValid = false
    } else if (!isValidDate(participant.birthdate)) {
      fieldErrors.value.participants[index].birthdate = 'Vul je correcte geboortedatum in (DD-MM-JJJJ)'
      isValid = false
    }
    if (!participant.postcode?.trim()) {
      fieldErrors.value.participants[index].postcode = 'Vul je postcode in'
      isValid = false
    }
    if (!participant.housenumber?.trim()) {
      fieldErrors.value.participants[index].housenumber = 'Vul je huisnummer in'
      isValid = false
    }
    if (!participant.phone?.trim()) {
      fieldErrors.value.participants[index].phone = 'Vul je telefoonnummer in'
      isValid = false
    }
    if (!participant.email?.trim()) {
      fieldErrors.value.participants[index].email = 'Vul je e-mailadres in'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participant.email)) {
      fieldErrors.value.participants[index].email = 'Vul een geldig e-mailadres in'
      isValid = false
    }
  })
  
  return isValid
}

const handleSubmit = async () => {
  if (!validateAllFields()) {
    return
  }
  
  isSubmitting.value = true
  
  // Simulate API call
  setTimeout(() => {
    console.log('Form submitted')
    console.log('Main person:', props.mainPerson)
    console.log('Participants:', props.participants)
    isSubmitting.value = false
    emit('next')
  }, 1000)
}
</script>

<style scoped>
.form-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

.form-wrapper {
  width: 100%;
}

.main-title {
  color: #1a1a1a;
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.5;
}

/* Participants Summary */
.participants-summary {
  background: white;
  border: 1px solid #e5ddd0;
  border-radius: 12px;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.summary-content h2 {
  color: #1a1a1a;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.summary-content p {
  color: #4a4a4a;
  margin: 0;
  font-size: 0.95rem;
}

.adjust-btn {
  background: #f8f9fa;
  border: 1px solid #556B2F;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  color: #556B2F;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'lato', sans-serif;
}

.adjust-btn .edit-icon {
  flex-shrink: 0;
}

.adjust-btn:hover {
  background: #fff8f0;
  border-color: #556B2F;
  font-family: 'lato', sans-serif;
}

/* Field Error Styling */
input.error,
select.error {
  border-color: #dc3545 !important;
  background: #fff5f5 !important;
}

.error-message {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.35rem;
  display: block;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-content h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.participant-counter {
  margin-bottom: 2rem;
}

.participant-counter label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 500;
  color: #333;
}

.counter-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.counter-controls button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #2d7a4f;
  background: white;
  color: #2d7a4f;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.counter-controls button:hover:not(:disabled) {
  background: #2d7a4f;
  color: white;
}

.counter-controls button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.counter-controls span {
  font-size: 1.5rem;
  font-weight: 600;
  min-width: 40px;
  text-align: center;
}

.close-modal-btn {
  width: 100%;
  padding: 0.75rem;
  background: #2d7a4f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
}

.close-modal-btn:hover {
  background: #246340;
}

/* Section Card */
.section-card {
  background: #ffffff;
  border: 1px solid #e5ddd0;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

h3 {
  color: #1a1a1a;
  margin: 0 0 1.5rem 0;
  font-size: 1.15rem;
  font-weight: 600;
}

.clean-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
  font-family: 'lato', sans-serif;
}

label {
  color: #1a1a1a;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.optional {
  color: #888;
  font-weight: 400;
  font-size: 0.85rem;
}

input[type="text"],
input[type="email"],
input[type="tel"],
select {
  padding: 0.7rem 0.9rem;
  border: 1px solid #666666;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s;
  font-family: inherit;
  background: #fafafa;
}

input::placeholder {
  color: #aaa;
}

input:focus,
select:focus {
  outline: none;
  border-color: #3A6F72;
  background: white;
}

.radio-group {
  display: flex;
  gap: 2rem;
  font-family: 'lato', sans-serif;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 400;
  font-family: 'lato', sans-serif;
}

.radio-label input[type="radio"] {
  margin-right: 0.5rem;
  cursor: pointer;
  width: 18px;
  height: 18px;
  accent-color: #556B2f;
}

.address-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.checkbox-group {
  margin-top: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'lato', sans-serif;
}

.checkbox-label input[type="checkbox"] {
  margin: 0.25rem 0.75rem 0 0;
  width: 22px;
  height: 22px;
  accent-color: #556B2f;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 4px;
}

.info-text {
  color: #556B2f;
  font-size: 0.875rem;
  background: #e8f5e9;
  padding: 0.6rem 0.9rem;
  border-radius: 6px;
  border: 1px solid #c8e6c9;
}

.address-label {
  color: #556B2f;
  font-weight: 600;
}

.address-display {
  color: #1a1a1a;
  font-size: 0.95rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid #666666;
  border-radius: 8px;
  background: #fafafa;
}

.address-loading {
  color: #888;
  font-size: 0.9rem;
  font-style: italic;
  padding: 0.7rem 0.9rem;
}

.address-placeholder {
  color: #aaa;
  font-size: 0.9rem;
  padding: 0.7rem 0.9rem;
}

.submit-btn {
  background: #556B2f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover:not(:disabled) {
  background: #4a5f3d;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-container {
    padding: 0 0.5rem;
  }

  .main-title {
    font-size: 1.25rem;
  }

  .participants-summary {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    padding: 1.25rem;
  }

  .adjust-btn {
    width: 100%;
    justify-content: center;
  }
  
  .address-row {
    grid-template-columns: 1fr;
  }
  
  .section-card {
    padding: 1.5rem;
  }

  .radio-group {
    gap: 1rem;
  }
}
</style>
