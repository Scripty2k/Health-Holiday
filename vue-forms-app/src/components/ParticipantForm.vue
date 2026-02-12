<template>
  <div class="section-card">
    <div class="section-header">
      <h3>Gegevens deelnemer {{ participantNumber }}</h3>
      <button 
        v-if="showRemove" 
        @click="$emit('remove')" 
        type="button" 
        class="remove-btn"
      >
        Verwijderen
      </button>
    </div>
    
    <div class="form-group">
      <div class="radio-group">
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
    </div>

    <div class="form-group">
      <label :for="'firstname-' + participantNumber">Alle namen (volgens reisdocument)</label>
      <input
        :id="'firstname-' + participantNumber"
        :value="participant.firstname"
        @input="updateField('firstname', $event.target.value)"
        @blur="$emit('validate', 'firstname')"
        type="text"
        placeholder="Alle namen (volgens reisdocument)"
        :class="{ 'error': errors?.firstname }"
      />
      <span v-if="errors?.firstname" class="error-message">{{ errors.firstname }}</span>
    </div>

    <div class="form-group">
      <label :for="'lastname-' + participantNumber">Achternaam (volgens paspoort)</label>
      <input
        :id="'lastname-' + participantNumber"
        :value="participant.lastname"
        @input="updateField('lastname', $event.target.value)"
        @blur="$emit('validate', 'lastname')"
        type="text"
        placeholder="Achternaam (volgens paspoort)"
        :class="{ 'error': errors?.lastname }"
      />
      <span v-if="errors?.lastname" class="error-message">{{ errors.lastname }}</span>
    </div>

    <div class="form-group">
      <label :for="'birthdate-' + participantNumber">Geboortedatum</label>
      <input
        :id="'birthdate-' + participantNumber"
        :value="participant.birthdate"
        @input="updateField('birthdate', $event.target.value)"
        @blur="$emit('validate', 'birthdate')"
        type="text"
        placeholder="DD-MM-JJJJ"
        :class="{ 'error': errors?.birthdate }"
      />
      <span v-if="errors?.birthdate" class="error-message">{{ errors.birthdate }}</span>
    </div>

    <div class="form-group">
      <label :for="'nationality-' + participantNumber">Nationaliteit</label>
      <select 
        :id="'nationality-' + participantNumber" 
        :value="participant.nationality"
        @change="updateField('nationality', $event.target.value)"
      >
        <option value="nederlands">Nederlands</option>
        <option value="belgisch">Belgisch</option>
        <option value="duits">Duits</option>
        <option value="frans">Frans</option>
        <option value="anders">Anders</option>
      </select>
    </div>

    <div class="form-group">
      <label :for="'country-' + participantNumber">Land</label>
      <select 
        :id="'country-' + participantNumber"
        :value="participant.country"
        @change="updateField('country', $event.target.value)"
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
        <label :for="'postcode-' + participantNumber">Postcode</label>
        <input
          :id="'postcode-' + participantNumber"
          :value="participant.postcode"
          @input="updateField('postcode', $event.target.value)"
          @blur="$emit('validate', 'postcode')"
          type="text"
          placeholder="1111"
          :class="{ 'error': errors?.postcode }"
        />
        <span v-if="errors?.postcode" class="error-message">{{ errors.postcode }}</span>
      </div>
      <div class="form-group">
        <label :for="'housenumber-' + participantNumber">Huisnummer</label>
        <input
          :id="'housenumber-' + participantNumber"
          :value="participant.housenumber"
          @input="updateField('housenumber', $event.target.value)"
          @blur="$emit('validate', 'housenumber')"
          type="text"
          placeholder="12"
          :class="{ 'error': errors?.housenumber }"
        />
        <span v-if="errors?.housenumber" class="error-message">{{ errors.housenumber }}</span>
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
      <input
        :id="'phone-' + participantNumber"
        :value="participant.phone"
        @input="updateField('phone', $event.target.value)"
        @blur="$emit('validate', 'phone')"
        type="tel"
        placeholder="Telefoonnummer"
        :class="{ 'error': errors?.phone }"
      />
      <span v-if="errors?.phone" class="error-message">{{ errors.phone }}</span>
    </div>

    <div class="form-group">
      <label :for="'email-' + participantNumber">E-mailadres</label>
      <input
        :id="'email-' + participantNumber"
        :value="participant.email"
        @input="updateField('email', $event.target.value)"
        @blur="$emit('validate', 'email')"
        type="email"
        placeholder="E-mailadres"
        :class="{ 'error': errors?.email }"
      />
      <span v-if="errors?.email" class="error-message">{{ errors.email }}</span>
    </div>
  </div>
</template>

<script setup>
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
  },
  errors: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update', 'remove', 'validate'])

const updateField = (field, value) => {
  emit('update', { [field]: value })
}
</script>

<style scoped>
.section-card {
  background: #ffffff;
  border: 1px solid #e5ddd0;
  border-radius: 12px;
  padding: 2rem;
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
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
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
