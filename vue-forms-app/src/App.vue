<template>
  <div id="booking">
    <header class="app-header">
      <h1>Bijna op Health Holiday</h1>
      <p>Vul je gegevens in om je je boeking compleet te maken.</p>
    </header>

    <ProgressStepper 
      :steps="stepLabels" 
      :currentStep="currentStep"
      @step-click="goToStep"
    />

    <main class="main-content">
      <ContactForm 
        v-if="currentStep === 1" 
        :mainPerson="formData.mainPerson"
        :participants="formData.participants"
        @update:mainPerson="updateMainPerson"
        @update:participant="updateParticipant"
        @add-participant="addParticipant"
        @remove-participant="removeParticipant"
        @next="goToNextStep" 
      />
      <ExtrasForm 
        v-if="currentStep === 2" 
        :participants="formData.participants"
        :extras="formData.extras"
        @update:extras="updateExtras"
        @next="goToNextStep"
        @back="goToPreviousStep"
      />
      <Lifestyle
        v-if="currentStep === 3"
        :participants="formData.participants"
        :lifestyleData="formData.lifestyle"
        @update:lifestyle="updateLifestyle"
        @next="goToNextStep"
        @back="goToPreviousStep"
      />
      <FinalForm 
        v-if="currentStep === 4" 
        :formData="formData"
      />
    </main>
<!-- 
    <footer class="app-footer">
      <p>footer</p>
    </footer> -->
  </div>
</template>

<!-- Hier even meer dingen toevoegen als ik meer forms heb -->
<script setup>
import { ref, reactive, watch } from 'vue'
import ContactForm from './components/ContactForm.vue'
import ExtrasForm from './components/ExtrasForm.vue'
import Lifestyle from './components/Lifestyle.vue'
import FinalForm from './components/FinalForm.vue'
import ProgressStepper from './components/ProgressStepper.vue'

const currentStep = ref(1)

const stepLabels = [
  'Persoonsgegevens',
  'Extra bij het boeken',
  'Leefstijlcheck',
  'Bevestiging'
]

// Centralized form data storage
const formData = reactive({
  // Main person details (person making the booking)
  mainPerson: {
    gender: '',
    firstname: '',
    lastname: '',
    birthdate: '',
    nationality: 'dutch',
    country: 'netherlands',
    postcode: '',
    housenumber: '',
    addition: '',
    phone: '',
    email: '',
    alsoParticipant: false
  },
  // Array of participants
  participants: [
    {
      id: 1,
      gender: '',
      firstname: '',
      lastname: '',
      birthdate: '',
      nationality: 'dutch',
      country: 'netherlands',
      postcode: '',
      housenumber: '',
      addition: '',
      phone: '',
      email: ''
    },
    {
      id: 2,
      gender: '',
      firstname: '',
      lastname: '',
      birthdate: '',
      nationality: 'dutch',
      country: 'netherlands',
      postcode: '',
      housenumber: '',
      addition: '',
      phone: '',
      email: ''
    }
  ],
  // Extras/add-ons
  extras: {
    luggageOutbound: [],
    luggageReturn: [],
    transferOutbound: 'none',
    transferReturn: 'none',
    travelInsurance: [],
    cancellationInsurance: 'none',
    stayExtras: {
      taxi: false,
      carRental: false,
      parking: false
    }
  },
  // Lifestyle data
  lifestyle: []
})

// Initialize extras and lifestyle arrays based on participant count
const initializeExtrasArrays = () => {
  const participantCount = formData.participants.length
  formData.extras.luggageOutbound = Array(participantCount).fill('none')
  formData.extras.luggageReturn = Array(participantCount).fill('none')
  formData.extras.travelInsurance = Array(participantCount).fill('none')
}

const initializeLifestyleData = () => {
  const participantCount = formData.participants.length
  formData.lifestyle = Array(participantCount).fill(null).map(() => ({
    height: '',
    weight: '',
    alcohol: '',
    glassesPerDay: '',
    smoking: '',
    coffeeTea: '',
    fitnessLevel: null,
    medication: '',
    physicalComplaints: '',
    mentalComplaints: ''
  }))
}

initializeExtrasArrays()
initializeLifestyleData()

// Update main person data
const updateMainPerson = (updates) => {
  Object.assign(formData.mainPerson, updates)
}

// Update specific participant
const updateParticipant = (index, updates) => {
  Object.assign(formData.participants[index], updates)
}

// Add new participant
const addParticipant = () => {
  const newId = formData.participants.length > 0 
    ? Math.max(...formData.participants.map(p => p.id)) + 1 
    : 1
  
  formData.participants.push({
    id: newId,
    gender: '',
    firstname: '',
    lastname: '',
    birthdate: '',
    nationality: 'dutch',
    country: 'netherlands',
    postcode: '',
    housenumber: '',
    addition: '',
    phone: '',
    email: ''
  })
  
  // Add default extras for new participant
  formData.extras.luggageOutbound.push('none')
  formData.extras.luggageReturn.push('none')
  formData.extras.travelInsurance.push('none')
  
  // Add default lifestyle data for new participant
  formData.lifestyle.push({
    height: '',
    weight: '',
    alcohol: '',
    glassesPerDay: '',
    smoking: '',
    coffeeTea: '',
    fitnessLevel: null,
    medication: '',
    physicalComplaints: '',
    mentalComplaints: ''
  })
}

// Remove participant
const removeParticipant = (index) => {
  if (formData.participants.length > 1) {
    formData.participants.splice(index, 1)
    // Remove extras for removed participant
    formData.extras.luggageOutbound.splice(index, 1)
    formData.extras.luggageReturn.splice(index, 1)
    formData.extras.travelInsurance.splice(index, 1)
    // Remove lifestyle data for removed participant
    formData.lifestyle.splice(index, 1)
  }
}

// Update extras
const updateExtras = (update) => {
  if (update.category === 'stayExtras') {
    formData.extras.stayExtras[update.type] = update.value
  } else if (update.index !== undefined) {
    // Array-based extras (per participant)
    formData.extras[update.category][update.index] = update.value
  } else {
    // Single value extras
    formData.extras[update.category] = update.value
  }
}

// Update lifestyle data
const updateLifestyle = (update) => {
  if (!formData.lifestyle[update.index]) {
    formData.lifestyle[update.index] = {}
  }
  formData.lifestyle[update.index][update.field] = update.value
}

// Watch for form data changes and log them
watch(formData, (newData) => {
  console.log('Form data updated:', newData)
}, { deep: false })

// go to next step
const goToNextStep = () => {
  if (currentStep.value < stepLabels.length) {
    currentStep.value++
  }
}

// go to previous step
const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// go to specific step (only if it's the current step or a completed step)
const goToStep = (stepNumber) => {
  if (stepNumber <= currentStep.value) {
    currentStep.value = stepNumber
  }
}
</script>

<style>
/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Merriweather', serif;
  background: #f5e6d3;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: bold;
}

p {
  font-family: 'Lato', sans-serif;
}

input, select, textarea, button {
  font-family: 'Lato', sans-serif;
}

#booking {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: #F5E5D3;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.app-header h1 {
  color: #1a1a1a;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  letter-spacing: -0.5px;
}

.app-header p {
  color: #5a5a5a;
  font-size: 1.1rem;
  font-weight: 400;
}

.main-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.app-footer {
  background: #3a3a3a;
  color: #e0e0e0;
  text-align: center;
  padding: 1.5rem;
  font-size: 0.875rem;
  border-top: 1px solid #e5ddd0;
}

@media (max-width: 768px) {
  .app-header {
    padding: 2rem 1rem;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .app-header p {
    font-size: 0.95rem;
  }
  
  .main-content {
    padding: 1rem;
  }
} */
</style>
