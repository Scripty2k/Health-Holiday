<template>
  <div class="lifestyle-container">
    <div class="lifestyle-wrapper">
    <h1 class="main-title">{{ $t('lifestyleForm.mainTitle') }}</h1>
    <p class="subtitle">{{ $t('lifestyleForm.subtitle') }}</p>
    <p class="skip-notice">
      <span class="skip-link" @click="handleSkip">{{ $t('lifestyleForm.skip') }}</span>
    </p>

      <form @submit.prevent="handleSubmit" class="lifestyle-form" novalidate>
        
        <div v-for="(participant, index) in participants" :key="participant.id" class="participant-section">
          <h2 class="participant-title">{{ $t('participantForm.participant') }} {{ index + 1 }}</h2>
          
          <div class="form-grid">
            <!-- Height -->
            <div class="form-group">
              <label :for="'height-' + index">{{ $t('lifestyleForm.height') }}</label>
              <div class="input-with-unit">
                <input 
                  :id="'height-' + index"
                  type="number" 
                  :value="lifestyleData[index]?.height || ''"
                  @input="updateLifestyle(index, 'height', $event.target.value)"
                  @blur="validateField(index, 'height')"
                  placeholder=""
                  :class="{ 'error': fieldErrors[index]?.height }"
                />
                <span class="unit">{{ $t('lifestyleForm.unitCm') }}</span>
              </div>
              <span v-if="fieldErrors[index]?.height" class="error-message">{{ fieldErrors[index].height }}</span>
            </div>

            <!-- Weight -->
            <div class="form-group">
              <label :for="'weight-' + index">
                {{ $t('lifestyleForm.weight') }}
              </label>
              <div class="input-with-unit">
                <input 
                  :id="'weight-' + index"
                  type="number" 
                  :value="lifestyleData[index]?.weight || ''"
                  @input="updateLifestyle(index, 'weight', $event.target.value)"
                  @blur="validateField(index, 'weight')"
                  placeholder=""
                  :class="{ 'error': fieldErrors[index]?.weight }"
                />
                <span class="unit">{{ $t('lifestyleForm.unitKg') }}</span>
              </div>
              <span v-if="fieldErrors[index]?.weight" class="error-message">{{ fieldErrors[index].weight }}</span>
            </div>

            <!-- Alcohol -->
            <div class="form-group">
              <label>{{ $t('lifestyleForm.alcoholQuestion') }}</label>
              <div class="radio-group">
                <label class="radio-option">
                  <input 
                    type="radio" 
                    :name="'alcohol-' + index"
                    value="yes"
                    :checked="lifestyleData[index]?.alcohol === 'yes'"
                    @change="updateLifestyle(index, 'alcohol', 'yes'); validateField(index, 'alcohol')"
                  />
                  <span>{{ $t('lifestyleForm.yes') }}</span>
                </label>
                <label class="radio-option">
                  <input 
                    type="radio" 
                    :name="'alcohol-' + index"
                    value="no"
                    :checked="lifestyleData[index]?.alcohol === 'no'"
                    @change="updateLifestyle(index, 'alcohol', 'no'); validateField(index, 'alcohol')"
                  />
                  <span>{{ $t('lifestyleForm.no') }}</span>
                </label>
              </div>
              <span v-if="fieldErrors[index]?.alcohol" class="error-message">{{ fieldErrors[index].alcohol }}</span>
            </div>

            <!-- Glasses per day -->
            <div class="form-group" v-if="lifestyleData[index]?.alcohol === 'yes'">
              <label :for="'glasses-' + index">{{ $t('lifestyleForm.glassesPerDay') }}</label>
              <div class="input-with-unit">
                <input 
                  :id="'glasses-' + index"
                  type="number" 
                  :value="lifestyleData[index]?.glassesPerDay || ''"
                  @input="updateLifestyle(index, 'glassesPerDay', $event.target.value)"
                  @blur="validateField(index, 'glassesPerDay')"
                  placeholder=""
                  :class="{ 'error': fieldErrors[index]?.glassesPerDay }"
                />
                <span class="unit">{{ $t('lifestyleForm.unitGlasses') }}</span>
              </div>
              <span v-if="fieldErrors[index]?.glassesPerDay" class="error-message">{{ fieldErrors[index].glassesPerDay }}</span>
            </div>

            <!-- Smoking -->
            <div class="form-group">
              <label>{{ $t('lifestyleForm.smokingQuestion') }}</label>
              <div class="radio-group">
                <label class="radio-option">
                  <input 
                    type="radio" 
                    :name="'smoking-' + index"
                    value="yes"
                    :checked="lifestyleData[index]?.smoking === 'yes'"
                    @change="updateLifestyle(index, 'smoking', 'yes'); validateField(index, 'smoking')"
                  />
                  <span>{{ $t('lifestyleForm.yes') }}</span>
                </label>
                <label class="radio-option">
                  <input 
                    type="radio" 
                    :name="'smoking-' + index"
                    value="no"
                    :checked="lifestyleData[index]?.smoking === 'no'"
                    @change="updateLifestyle(index, 'smoking', 'no'); validateField(index, 'smoking')"
                  />
                  <span>{{ $t('lifestyleForm.no') }}</span>
                </label>
              </div>
              <span v-if="fieldErrors[index]?.smoking" class="error-message">{{ fieldErrors[index].smoking }}</span>
            </div>

            <!-- Coffee/Tea -->
            <div class="form-group">
              <label>{{ $t('lifestyleForm.coffeeTeaQuestion') }}</label>
              <div class="radio-group">
                <label class="radio-option">
                  <input 
                    type="radio" 
                    :name="'coffee-' + index"
                    value="yes"
                    :checked="lifestyleData[index]?.coffeeTea === 'yes'"
                    @change="updateLifestyle(index, 'coffeeTea', 'yes'); validateField(index, 'coffeeTea')"
                  />
                  <span>{{ $t('lifestyleForm.yes') }}</span>
                </label>
                <label class="radio-option">
                  <input 
                    type="radio" 
                    :name="'coffee-' + index"
                    value="no"
                    :checked="lifestyleData[index]?.coffeeTea === 'no'"
                    @change="updateLifestyle(index, 'coffeeTea', 'no'); validateField(index, 'coffeeTea')"
                  />
                  <span>{{ $t('lifestyleForm.no') }}</span>
                </label>
              </div>
            </div>

            <!-- Fitness level -->
            <div class="form-group full-width">
              <label>{{ $t('lifestyleForm.fitnessLevel') }}</label>
              <div class="fitness-scale">
                <button 
                  v-for="n in 5" 
                  :key="n"
                  type="button"
                  class="fitness-button"
                  :class="{ active: lifestyleData[index]?.fitnessLevel === n }"
                  @click="updateLifestyle(index, 'fitnessLevel', n); validateField(index, 'fitnessLevel')"
                >
                  {{ n }}
                </button>
              </div>
              <span v-if="fieldErrors[index]?.fitnessLevel" class="error-message">{{ fieldErrors[index].fitnessLevel }}</span>
            </div>

            <!-- Medication -->
            <div class="form-group">
              <label>{{ $t('lifestyleForm.medicationQuestion') }}</label>
              <div class="radio-group">
                <label class="radio-option">
                  <input 
                    type="radio" 
                    :name="'medication-' + index"
                    value="yes"
                    :checked="lifestyleData[index]?.medication === 'yes'"
                    @change="updateLifestyle(index, 'medication', 'yes'); validateField(index, 'medication')"
                  />
                  <span>{{ $t('lifestyleForm.yes') }}</span>
                </label>
                <label class="radio-option">
                  <input 
                    type="radio" 
                    :name="'medication-' + index"
                    value="no"
                    :checked="lifestyleData[index]?.medication === 'no'"
                    @change="updateLifestyle(index, 'medication', 'no'); validateField(index, 'medication')"
                  />
                  <span>{{ $t('lifestyleForm.no') }}</span>
                </label>
              </div>
              <span v-if="fieldErrors[index]?.medication" class="error-message">{{ fieldErrors[index].medication }}</span>
            </div>

            <!-- Physical complaints -->
            <div class="form-group">
              <label>{{ $t('lifestyleForm.physicalComplaints') }}</label>
              <div class="radio-group">
                <label class="radio-option">
                  <input 
                    type="radio" 
                    :name="'physical-' + index"
                    value="yes"
                    :checked="lifestyleData[index]?.physicalComplaints === 'yes'"
                    @change="updateLifestyle(index, 'physicalComplaints', 'yes'); validateField(index, 'physicalComplaints')"
                  />
                  <span>{{ $t('lifestyleForm.yes') }}</span>
                </label>
                <label class="radio-option">
                  <input 
                    type="radio" 
                    :name="'physical-' + index"
                    value="no"
                    :checked="lifestyleData[index]?.physicalComplaints === 'no'"
                    @change="updateLifestyle(index, 'physicalComplaints', 'no'); validateField(index, 'physicalComplaints')"
                  />
                  <span>{{ $t('lifestyleForm.no') }}</span>
                </label>
              </div>
              <span v-if="fieldErrors[index]?.physicalComplaints" class="error-message">{{ fieldErrors[index].physicalComplaints }}</span>
            </div>

            <!-- Mental complaints -->
            <div class="form-group">
              <label>{{ $t('lifestyleForm.mentalComplaints') }}</label>
              <div class="radio-group">
                <label class="radio-option">
                  <input 
                    type="radio" 
                    :name="'mental-' + index"
                    value="yes"
                    :checked="lifestyleData[index]?.mentalComplaints === 'yes'"
                    @change="updateLifestyle(index, 'mentalComplaints', 'yes'); validateField(index, 'mentalComplaints')"
                  />
                  <span>{{ $t('lifestyleForm.yes') }}</span>
                </label>
                <label class="radio-option">
                  <input 
                    type="radio" 
                    :name="'mental-' + index"
                    value="no"
                    :checked="lifestyleData[index]?.mentalComplaints === 'no'"
                    @change="updateLifestyle(index, 'mentalComplaints', 'no'); validateField(index, 'mentalComplaints')"
                  />
                  <span>{{ $t('lifestyleForm.no') }}</span>
                </label>
              </div>
              <span v-if="fieldErrors[index]?.mentalComplaints" class="error-message">{{ fieldErrors[index].mentalComplaints }}</span>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="handleBack" class="back-btn">
            <i class="fa-regular fa-arrow-left"></i>
            {{ $t('lifestyleForm.back') }}
          </button>
          <button type="submit" class="submit-btn">
            {{ $t('lifestyleForm.next') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n' 

const props = defineProps({
  participants: {
    type: Array,
    required: true
  },
  lifestyleData: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['next', 'back', 'update:lifestyle'])

const { t } = useI18n()

const fieldErrors = ref([])

// Initialize errors array for each participant
props.participants.forEach((_, index) => {
  fieldErrors.value[index] = {}
})

const validateField = (index, field) => {
  if (!fieldErrors.value[index]) {
    fieldErrors.value[index] = {}
  }
  
  const data = props.lifestyleData[index]
  
  if (field === 'height') {
    if (!data?.height) {
      fieldErrors.value[index].height = t('lifestyleForm.heightRequired')
    } else {
      fieldErrors.value[index].height = ''
    }
  } else if (field === 'weight') {
    if (!data?.weight) {
      fieldErrors.value[index].weight = t('lifestyleForm.weightRequired')
    } else {
      fieldErrors.value[index].weight = ''
    }
  } else if (field === 'alcohol') {
    if (!data?.alcohol) {
      fieldErrors.value[index].alcohol = t('lifestyleForm.selectOption')
    } else {
      fieldErrors.value[index].alcohol = ''
    }
  } else if (field === 'glassesPerDay') {
    if (data?.alcohol === 'yes' && !data?.glassesPerDay) {
      fieldErrors.value[index].glassesPerDay = t('lifestyleForm.glassesRequired')
    } else {
      fieldErrors.value[index].glassesPerDay = ''
    }
  } else if (field === 'smoking') {
    if (!data?.smoking) {
      fieldErrors.value[index].smoking = t('lifestyleForm.selectOption')
    } else {
      fieldErrors.value[index].smoking = ''
    }
  } else if (field === 'coffeeTea') {
    if (!data?.coffeeTea) {
      fieldErrors.value[index].coffeeTea = t('lifestyleForm.selectOption')
    } else {
      fieldErrors.value[index].coffeeTea = ''
    }
  } else if (field === 'fitnessLevel') {
    if (!data?.fitnessLevel) {
      fieldErrors.value[index].fitnessLevel = t('lifestyleForm.fitnessRequired')
    } else {
      fieldErrors.value[index].fitnessLevel = ''
    }
  } else if (field === 'medication') {
    if (!data?.medication) {
      fieldErrors.value[index].medication = t('lifestyleForm.selectOption')
    } else {
      fieldErrors.value[index].medication = ''
    }
  } else if (field === 'physicalComplaints') {
    if (!data?.physicalComplaints) {
      fieldErrors.value[index].physicalComplaints = t('lifestyleForm.selectOption')
    } else {
      fieldErrors.value[index].physicalComplaints = ''
    }
  } else if (field === 'mentalComplaints') {
    if (!data?.mentalComplaints) {
      fieldErrors.value[index].mentalComplaints = t('lifestyleForm.selectOption')
    } else {
      fieldErrors.value[index].mentalComplaints = ''
    }
  }
}

const validateAllFields = () => {
  let isValid = true
  
  props.lifestyleData.forEach((data, index) => {
    if (!fieldErrors.value[index]) {
      fieldErrors.value[index] = {}
    }
    
    // Validate all required fields
    if (!data?.height) {
      fieldErrors.value[index].height = t('lifestyleForm.heightRequired')
      isValid = false
    }
    if (!data?.weight) {
      fieldErrors.value[index].weight = t('lifestyleForm.weightRequired')
      isValid = false
    }
    if (!data?.alcohol) {
      fieldErrors.value[index].alcohol = t('lifestyleForm.selectOption')
      isValid = false
    }
    if (data?.alcohol === 'yes' && !data?.glassesPerDay) {
      fieldErrors.value[index].glassesPerDay = t('lifestyleForm.glassesRequired')
      isValid = false
    }
    if (!data?.smoking) {
      fieldErrors.value[index].smoking = t('lifestyleForm.selectOption')
      isValid = false
    }
    if (!data?.coffeeTea) {
      fieldErrors.value[index].coffeeTea = t('lifestyleForm.selectOption')
      isValid = false
    }
    if (!data?.fitnessLevel) {
      fieldErrors.value[index].fitnessLevel = t('lifestyleForm.fitnessRequired')
      isValid = false
    }
    if (!data?.medication) {
      fieldErrors.value[index].medication = t('lifestyleForm.selectOption')
      isValid = false
    }
    if (!data?.physicalComplaints) {
      fieldErrors.value[index].physicalComplaints = t('lifestyleForm.selectOption')
      isValid = false
    }
    if (!data?.mentalComplaints) {
      fieldErrors.value[index].mentalComplaints = t('lifestyleForm.selectOption')
      isValid = false
    }
  })
  
  return isValid
}

const updateLifestyle = (index, field, value) => {
  emit('update:lifestyle', { index, field, value })
}

const handleBack = () => {
  emit('back')
}

const handleSubmit = () => {
  if (!validateAllFields()) {
    return
  }
  
  // console.log('Lifestyle data submitted:', props.lifestyleData)
  emit('next')
}

const handleSkip = () => {
  emit('next')
}
</script>

<style scoped>
.lifestyle-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0.5rem;
  box-sizing: border-box;
}

.lifestyle-wrapper {
  width: 100%;
}

.main-title {
  color: #1a1a1a;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: left;
}

.subtitle {
  color: #4a4a4a;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-transform: none;
  letter-spacing: normal;
}

.skip-notice {
  margin-bottom: 2rem;
}

.skip-link {
  color: #4a90e2;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.95rem;
}

.skip-link:hover {
  color: #357abd;
}

.lifestyle-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Participant Sections */
.participant-section {
  background: white;
  border: 1px solid #e5ddd0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.participant-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'lato', sans-serif;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #1a1a1a;
  font-family: 'lato', sans-serif;
}

.hint {
  display: block;
  font-size: 0.85rem;
  font-weight: 400;
  color: #666;
  margin-top: 0.25rem;
}

/* Input with unit */
.input-with-unit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-with-unit input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #666666;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input-with-unit input:focus {
  outline: none;
  border-color: #3A6F72;
}

.unit {
  font-size: 0.95rem;
  color: #666;
  font-weight: 500;
  min-width: 50px;
}

/* Radio groups */
.radio-group {
  display: flex;
  gap: 1.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.radio-option input[type="radio"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #556B2f;
}

.radio-option span {
  font-size: 0.95rem;
  color: #1a1a1a;
  font-family: 'lato', sans-serif;
}

/* Fitness scale buttons */
.fitness-scale {
  display: flex;
  gap: 0.75rem;
}

.fitness-button {
  width: 50px;
  height: 50px;
  border: 2px solid #666666;
  border-radius: 8px;
  background: white;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s;
}

.fitness-button:hover {
  border-color: #3A6F72;
  background: #f9f9f9;
}

.fitness-button.active {
  background: #556B2f;
  border-color: #556B2f;
  color: white;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: #5a5a5a;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.75rem 1rem;
  transition: color 0.2s;
}

.back-btn:hover {
  color: #1a1a1a;
}

.submit-btn {
  background: #556B2f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.9rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover {
  background: #4a5f3d;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Field Error Styling */
input.error {
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
  .main-title {
    font-size: 1.5rem;
  }

  .participant-section {
    padding: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .fitness-scale {
    justify-content: space-between;
  }

  .fitness-button {
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .submit-btn,
  .back-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>