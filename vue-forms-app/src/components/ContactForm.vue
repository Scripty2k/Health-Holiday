<template>
  <div class="form-container">
    <div class="form-wrapper">

      <!-- Participants Summary -->
      <div class="participants-summary">
        <div class="summary-content">
          <h2>{{ $t('contactForm.participants') }}</h2>
            <p v-html="$t('contactForm.bookingFor', { count: participants.length })"></p>        </div>
        <button type="button" @click="toggleParticipantManager" class="adjust-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="edit-icon">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ $t('contactForm.adjust') }}
        </button>
      </div>

      <Form @submit="handleSubmit" class="clean-form" v-slot="{ errors }">
        <!-- Main Person Section -->
        <div class="section-card">
          <h3>{{ $t('contactForm.myDetails') }}</h3>

          <div class="form-group">
            <Field
              name="gender"
              :modelValue="mainPerson.gender"
              @update:modelValue="updateMainPersonField('gender', $event)"
              :rules="validateGender"
              v-slot="{ field, errors }"
            >
              <div class="radio-group" :class="{ 'error': errors.length > 0 }">
                <label class="radio-label">
                  <input 
                    type="radio" 
                    :checked="mainPerson.gender === 'man'"
                    @change="updateMainPersonField('gender', 'man')"
                    value="man"
                  />
                  <span>{{ $t('contactForm.man') }}</span>
                </label>
                <label class="radio-label">
                  <input 
                    type="radio" 
                    :checked="mainPerson.gender === 'woman'"
                    @change="updateMainPersonField('gender', 'woman')"
                    value="woman"
                  />
                  <span>{{ $t('contactForm.woman') }}</span>
                </label>
              </div>
            </Field>
            <ErrorMessage name="gender" class="error-message" />
          </div>

          <div class="form-group">
            <label for="firstname">{{ $t('contactForm.firstName') }}</label>
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
              :placeholder="$t('contactForm.firstNamePlaceholder')"
              :class="{ 'error': errors.length > 0 }"
            />
            </Field>
            <ErrorMessage name="firstname" class="error-message" />
          </div>

          <div class="form-group">
            <label for="lastname">{{ $t('contactForm.lastName') }}</label>
            <Field
              name="lastname"
              :modelValue="mainPerson.lastname"
              @update:modelValue="updateMainPersonField('lastname', $event)"
              :rules="validateLastname"
              v-slot="{ field, errors }"
            >
              <input
                v-bind="field"
                id="lastname"
                type="text"
                :placeholder="$t('contactForm.lastNamePlaceholder')"
                :class="{ 'error': errors.length > 0 }"
              />
            </Field>
            <ErrorMessage name="lastname" class="error-message" />
          </div>

          <div class="form-group">
            <label for="birthdate">{{ $t('contactForm.birthdate') }}</label>
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
                :placeholder="$t('contactForm.birthdatePlaceholder')"
                :class="{ 'error': errors.length > 0 }"
              />
            </Field>
            <ErrorMessage name="birthdate" class="error-message" />
          </div>

          <div class="form-group">
            <label for="nationality">{{ $t('contactForm.nationality') }}</label>
            <select 
              id="nationality" 
              :value="mainPerson.nationality"
              @change="updateMainPersonField('nationality', $event.target.value)"
            >
              <option value="dutch">{{ $t('contactForm.nederlands') }}</option>
              <option value="belgian">{{ $t('contactForm.belgian') }}</option>
              <option value="german">{{ $t('contactForm.german') }}</option>
              <option value="french">{{ $t('contactForm.french') }}</option>
              <option value="other">{{ $t('contactForm.other') }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="country">{{ $t('contactForm.country') }}</label>
            <select 
              id="country" 
              :value="mainPerson.country"
              @change="updateMainPersonField('country', $event.target.value)"
            >
              <option value="netherlands">{{ $t('contactForm.netherlands') }}</option>
              <option value="belgium">{{ $t('contactForm.belgium') }}</option>
              <option value="germany">{{ $t('contactForm.germany') }}</option>
              <option value="france">{{ $t('contactForm.france') }}</option>
              <option value="other">{{ $t('contactForm.other') }}</option>
            </select>
          </div>

          <div class="address-row">
            <div class="form-group">
              <label for="postcode">{{ $t('contactForm.postcode') }}</label>
              <Field
                name="postcode"
                :modelValue="mainPerson.postcode"
                @update:modelValue="updateMainPersonField('postcode', $event)"
                :rules="validatePostcode"
                v-slot="{ field, errors }"
              >
                <input
                  v-bind="field"
                  id="postcode"
                  type="text"
                  placeholder="1234 AB"
                  :class="{ 'error': errors.length > 0 }"
                />
              </Field>
              <ErrorMessage name="postcode" class="error-message" />
            </div>
            <div class="form-group">
              <label for="housenumber">{{ $t('contactForm.houseNumber') }}</label>
              <Field
                name="housenumber"
                :modelValue="mainPerson.housenumber"
                @update:modelValue="updateMainPersonField('housenumber', $event)"
                :rules="validateHousenumber"
                v-slot="{ field, errors }"
              >
                <input
                  v-bind="field"
                  id="housenumber"
                  type="text"
                  placeholder="12"
                  :class="{ 'error': errors.length > 0 }"
                />
              </Field>
              <ErrorMessage name="housenumber" class="error-message" />
            </div>
            <div class="form-group">
              <label for="addition">{{ $t('contactForm.addition') }} <span class="optional">(optioneel)</span></label>
              <input
                id="addition"
                :value="mainPerson.addition"
                @input="updateMainPersonField('addition', $event.target.value)"
                type="text"
                placeholder="A"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="phone">{{ $t('contactForm.phone') }}</label>
            <Field
              name="phone"
              :modelValue="mainPerson.phone"
              @update:modelValue="updateMainPersonField('phone', $event)"
              :rules="validatePhone"
              v-slot="{ field, errors }"
            >
              <input
                v-bind="field"
                id="phone"
                type="tel"
                placeholder="06 12345678"
                :class="{ 'error': errors.length > 0 }"
              />
            </Field>
            <ErrorMessage name="phone" class="error-message" />
          </div>

          <div class="form-group">
            <label for="email">{{ $t('contactForm.email') }}</label>
            <Field
              name="email"
              :modelValue="mainPerson.email"
              @update:modelValue="updateMainPersonField('email', $event)"
              :rules="validateEmail"
              v-slot="{ field, errors }"
            >
              <input
                v-bind="field"
                id="email"
                type="email"
                :placeholder="$t('contactForm.emailPlaceholder')"
                :class="{ 'error': errors.length > 0 }"
              />
            </Field>
            <ErrorMessage name="email" class="error-message" />
          </div>

          <div class="checkbox-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                :checked="mainPerson.alsoParticipant"
                @change="updateMainPersonField('alsoParticipant', $event.target.checked)"
              />
              <span>{{ $t('contactForm.isParticipant') }}</span>
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
          @update="(updates) => handleParticipantUpdate(index, updates)"
          @remove="handleRemoveParticipant(index)"
        />

        <button type="submit" :disabled="isSubmitting" class="submit-btn">
          {{ isSubmitting ? $t('contactForm.submitting') : $t('contactForm.next') }}
        </button>
      </Form>
    </div>
  </div>

  <!-- Participant Manager Modal (Teleported to body) -->
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="showParticipantManager" class="modal-overlay" @click="toggleParticipantManager">
        <div class="modal-content" @click.stop>
          <h3>{{ $t('contactForm.participants') }}</h3>
          <div class="participant-counter">
            <label v-html="$t('contactForm.bookingFor', { count: participants.length })"></label>
            <div class="counter-controls">
              <button type="button" @click="decreaseParticipants" :disabled="participants.length <= 1">-</button>
              <span>{{ participants.length }}</span>
              <button type="button" @click="increaseParticipants">+</button>
            </div>
          </div>
          <button type="button" @click="toggleParticipantManager" class="close-modal-btn">{{ $t('contactForm.close') }}</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import ParticipantForm from './ParticipantForm.vue'
import { useI18n } from 'vue-i18n' 

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

const { t } = useI18n()

const isSubmitting = ref(false)
const showParticipantManager = ref(false)

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

// VeeValidate validation functions
const validateGender = (value) => {
  if (!value || !value.trim()) {
    return t('validation.gender') // Uses i18n key
  }
  return true
}

const validateFirstname = (value) => {
  if (!value || !value.trim()) {
    return t('validation.firstName')
  }
  return true
}

const validateLastname = (value) => {
  if (!value || !value.trim()) {
    return t('validation.lastName')
  }
  return true
}

const validateBirthdate = (value) => {
  if (!value || !value.trim()) {
    return t('validation.birthdate')
  }
  if (!isValidDate(value)) {
    return t('validation.invalidDate')
  }
  return true
}

const validatePostcode = (value) => {
  if (!value || !value.trim()) {
    return t('validation.postcode')
  }
  return true
}

const validateHousenumber = (value) => {
  if (!value || !value.trim()) {
    return t('validation.houseNumber')
  }
  return true
}

const validatePhone = (value) => {
  if (!value || !value.trim()) {
    return t('validation.phone')
  }
  return true
}

const validateEmail = (value) => {
  if (!value || !value.trim()) {
    return t('validation.email')
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return t('validation.invalidEmail')
  }
  return true
}

const handleSubmit = async () => {
  isSubmitting.value = true
  
  //Simulate API call
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0.5rem;
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
  overflow-y: auto;
  padding: 2rem 0;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  margin: auto;
  position: relative;
}

/* Modal Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: scale(0.9);
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
  padding: 1.5rem;
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
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.radio-group.error {
  background: #fff5f5;
  border: 2px solid #dc3545;
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
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.address-row .form-group:last-child {
  grid-column: 1 / -1;
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
