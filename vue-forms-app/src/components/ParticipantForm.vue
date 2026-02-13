<template>
  <div class="section-card">
    <div class="section-header">
      <h3>Gegevens deelnemer {{ participantNumber }}</h3>
    </div>
    
    <div class="form-group">
      <Field
        :name="'participant-gender-' + participantNumber"
        :modelValue="participant.gender"
        @update:modelValue="updateField('gender', $event)"
        :rules="validateGender"
        v-slot="{ field, errors }"
      >
        <div class="radio-group" :class="{ 'error': errors.length > 0 }">
          <label class="radio-label">
            <input 
              type="radio" 
              :value="'man'" 
              :checked="participant.gender === 'man'"
              @change="updateField('gender', 'man')"
            />
            <span>Man</span>
          </label>
          <label class="radio-label">
            <input 
              type="radio" 
              :value="'vrouw'" 
              :checked="participant.gender === 'vrouw'"
              @change="updateField('gender', 'vrouw')"
            />
            <span>Vrouw</span>
          </label>
        </div>
      </Field>
      <ErrorMessage :name="'participant-gender-' + participantNumber" class="error-message" />
    </div>

    <div class="form-group">
      <label :for="'firstname-' + participantNumber">Alle namen (volgens reisdocument)</label>
      <Field
        :name="'participant-firstname-' + participantNumber"
        :modelValue="participant.firstname"
        @update:modelValue="updateField('firstname', $event)"
        :rules="validateFirstname"
        v-slot="{ field, errors }"
      >
        <input
          v-bind="field"
          :id="'firstname-' + participantNumber"
          type="text"
          placeholder="Alle namen (volgens reisdocument)"
          :class="{ 'error': errors.length > 0 }"
        />
      </Field>
      <ErrorMessage :name="'participant-firstname-' + participantNumber" class="error-message" />
    </div>

    <div class="form-group">
      <label :for="'lastname-' + participantNumber">Achternaam (volgens paspoort)</label>
      <Field
        :name="'participant-lastname-' + participantNumber"
        :modelValue="participant.lastname"
        @update:modelValue="updateField('lastname', $event)"
        :rules="validateLastname"
        v-slot="{ field, errors }"
      >
        <input
          v-bind="field"
          :id="'lastname-' + participantNumber"
          type="text"
          placeholder="Achternaam (volgens paspoort)"
          :class="{ 'error': errors.length > 0 }"
        />
      </Field>
      <ErrorMessage :name="'participant-lastname-' + participantNumber" class="error-message" />
    </div>

    <div class="form-group">
      <label :for="'birthdate-' + participantNumber">Geboortedatum</label>
      <Field
        :name="'participant-birthdate-' + participantNumber"
        :modelValue="participant.birthdate"
        @update:modelValue="updateField('birthdate', $event)"
        :rules="validateBirthdate"
        v-slot="{ field, errors }"
      >
        <input
          v-bind="field"
          :id="'birthdate-' + participantNumber"
          type="text"
          placeholder="DD-MM-JJJJ"
          :class="{ 'error': errors.length > 0 }"
        />
      </Field>
      <ErrorMessage :name="'participant-birthdate-' + participantNumber" class="error-message" />
    </div>

    <div class="form-group">
      <label :for="'nationality-' + participantNumber">Nationaliteit</label>
      <select 
        :id="'nationality-' + participantNumber" 
        :value="participant.nationality"
        @change="updateField('nationality', $event.target.value)"
      >
        <option value="dutch">Nederlands</option>
        <option value="belgian">Belgisch</option>
        <option value="german">Duits</option>
        <option value="french">Frans</option>
        <option value="other">Anders</option>
      </select>
    </div>

    <div class="form-group">
      <label :for="'country-' + participantNumber">Land</label>
      <select 
        :id="'country-' + participantNumber"
        :value="participant.country"
        @change="updateField('country', $event.target.value)"
      >
        <option value="netherlands">Nederland</option>
        <option value="belgium">België</option>
        <option value="germany">Duitsland</option>
        <option value="france">Frankrijk</option>
        <option value="other">Anders</option>
      </select>
    </div>

    <div class="address-row">
      <div class="form-group">
        <label :for="'postcode-' + participantNumber">Postcode</label>
        <Field
          :name="'participant-postcode-' + participantNumber"
          :modelValue="participant.postcode"
          @update:modelValue="updateField('postcode', $event)"
          :rules="validatePostcode"
          v-slot="{ field, errors }"
        >
          <input
            v-bind="field"
            :id="'postcode-' + participantNumber"
            type="text"
            placeholder="1111"
            :class="{ 'error': errors.length > 0 }"
          />
        </Field>
        <ErrorMessage :name="'participant-postcode-' + participantNumber" class="error-message" />
      </div>
      <div class="form-group">
        <label :for="'housenumber-' + participantNumber">Huisnummer</label>
        <Field
          :name="'participant-housenumber-' + participantNumber"
          :modelValue="participant.housenumber"
          @update:modelValue="updateField('housenumber', $event)"
          :rules="validateHousenumber"
          v-slot="{ field, errors }"
        >
          <input
            v-bind="field"
            :id="'housenumber-' + participantNumber"
            type="text"
            placeholder="12"
            :class="{ 'error': errors.length > 0 }"
          />
        </Field>
        <ErrorMessage :name="'participant-housenumber-' + participantNumber" class="error-message" />
      </div>
      <div class="form-group">
        <label :for="'addition-' + participantNumber">Toevoeging <span class="optional">(optioneel)</span></label>
        <input
          :id="'addition-' + participantNumber"
          :value="participant.addition"
          @input="updateField('addition', $event.target.value)"
          type="text"
          placeholder="B"
        />
      </div>
    </div>

    <div class="form-group">
      <label>Straat, Plaats</label>
      <div class="info-text">Will be auto-filled based on postal code</div>
    </div>

    <div class="form-group">
      <label :for="'phone-' + participantNumber">Telefoon</label>
      <Field
        :name="'participant-phone-' + participantNumber"
        :modelValue="participant.phone"
        @update:modelValue="updateField('phone', $event)"
        :rules="validatePhone"
        v-slot="{ field, errors }"
      >
        <input
          v-bind="field"
          :id="'phone-' + participantNumber"
          type="tel"
          placeholder="Telefoonnummer"
          :class="{ 'error': errors.length > 0 }"
        />
      </Field>
      <ErrorMessage :name="'participant-phone-' + participantNumber" class="error-message" />
    </div>

    <div class="form-group">
      <label :for="'email-' + participantNumber">E-mailadres</label>
      <Field
        :name="'participant-email-' + participantNumber"
        :modelValue="participant.email"
        @update:modelValue="updateField('email', $event)"
        :rules="validateEmail"
        v-slot="{ field, errors }"
      >
        <input
          v-bind="field"
          :id="'email-' + participantNumber"
          type="email"
          placeholder="E-mailadres"
          :class="{ 'error': errors.length > 0 }"
        />
      </Field>
      <ErrorMessage :name="'participant-email-' + participantNumber" class="error-message" />
    </div>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'

const props = defineProps({
  participant: {
    type: Object,
    required: true
  },
  participantNumber: {
    type: Number,
    required: true
  },
  showRemove: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update', 'remove'])

const updateField = (field, value) => {
  emit('update', { [field]: value })
}

// Date validation helper (Made with Veevalidate)
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
    return 'Kies je geslacht'
  }
  return true
}

const validateFirstname = (value) => {
  if (!value || !value.trim()) {
    return 'Vul je voornaam in'
  }
  return true
}

const validateLastname = (value) => {
  if (!value || !value.trim()) {
    return 'Vul je achternaam in'
  }
  return true
}

const validateBirthdate = (value) => {
  if (!value || !value.trim()) {
    return 'Vul je geboortedatum in (DD-MM-JJJJ)'
  }
  if (!isValidDate(value)) {
    return 'Vul je correcte geboortedatum in (DD-MM-JJJJ)'
  }
  return true
}

const validatePostcode = (value) => {
  if (!value || !value.trim()) {
    return 'Vul je postcode in'
  }
  return true
}

const validateHousenumber = (value) => {
  if (!value || !value.trim()) {
    return 'Vul je huisnummer in'
  }
  return true
}

const validatePhone = (value) => {
  if (!value || !value.trim()) {
    return 'Vul je telefoonnummer in'
  }
  return true
}

const validateEmail = (value) => {
  if (!value || !value.trim()) {
    return 'Vul je e-mailadres in'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Vul een geldig e-mailadres in'
  }
  return true
}
</script>

<style scoped>
.section-card {
  background: #ffffff;
  border: 1px solid #e5ddd0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h3 {
  color: #1a1a1a;
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
}

.remove-btn {
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #c33;
  cursor: pointer;
}

.remove-btn:hover {
  background: #fdd;
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

.info-text {
  color: #2d7a4f;
  font-size: 0.875rem;
  background: #e8f5e9;
  padding: 0.6rem 0.9rem;
  border-radius: 6px;
  border: 1px solid #c8e6c9;
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

@media (max-width: 768px) {
  .address-row {
    grid-template-columns: 1fr;
  }
  
  .section-card {
    padding: 1.5rem;
  }
}
</style>
