<template>
  <div class="form-container">
    <div class="header">
      <h2>Bevestiging</h2>
      <p class="subtitle">Controleer je gegevens voordat je de boeking voltooit.</p>
    </div>
    
    <div class="summary-section">
      <!-- Main Person Summary -->
      <div class="section-card">
        <h3>Mijn gegevens</h3>
        <div class="data-grid">
          <div class="data-item">
            <span class="label">Geslacht:</span>
            <span class="value">{{ formData.mainPerson.gender || '-' }}</span>
          </div>
          <div class="data-item">
            <span class="label">Naam:</span>
            <span class="value">{{ formData.mainPerson.firstname }} {{ formData.mainPerson.lastname }}</span>
          </div>
          <div class="data-item">
            <span class="label">Geboortedatum:</span>
            <span class="value">{{ formData.mainPerson.birthdate || '-' }}</span>
          </div>
          <div class="data-item">
            <span class="label">Nationaliteit:</span>
            <span class="value">{{ formData.mainPerson.nationality }}</span>
          </div>
          <div class="data-item">
            <span class="label">Land:</span>
            <span class="value">{{ formData.mainPerson.country }}</span>
          </div>
          <div class="data-item">
            <span class="label">Adres:</span>
            <span class="value">
              {{ formData.mainPerson.postcode }} 
              {{ formData.mainPerson.housenumber }}{{ formData.mainPerson.addition }}
            </span>
          </div>
          <div class="data-item">
            <span class="label">Telefoon:</span>
            <span class="value">{{ formData.mainPerson.phone || '-' }}</span>
          </div>
          <div class="data-item">
            <span class="label">E-mail:</span>
            <span class="value">{{ formData.mainPerson.email }}</span>
          </div>
          <div class="data-item">
            <span class="label">Ook deelnemer:</span>
            <span class="value">{{ formData.mainPerson.alsoParticipant ? 'Ja' : 'Nee' }}</span>
          </div>
        </div>
      </div>

      <!-- Participants Summary -->
      <div v-for="(participant, index) in formData.participants" :key="participant.id" class="section-card">
        <h3>Deelnemer {{ index + 1 }}</h3>
        <div class="data-grid">
          <div class="data-item">
            <span class="label">Geslacht:</span>
            <span class="value">{{ participant.gender || '-' }}</span>
          </div>
          <div class="data-item">
            <span class="label">Naam:</span>
            <span class="value">{{ participant.firstname }} {{ participant.lastname }}</span>
          </div>
          <div class="data-item">
            <span class="label">Geboortedatum:</span>
            <span class="value">{{ participant.birthdate || '-' }}</span>
          </div>
          <div class="data-item">
            <span class="label">Nationaliteit:</span>
            <span class="value">{{ participant.nationality }}</span>
          </div>
          <div class="data-item">
            <span class="label">Land:</span>
            <span class="value">{{ participant.country }}</span>
          </div>
          <div class="data-item">
            <span class="label">Adres:</span>
            <span class="value">
              {{ participant.postcode }} 
              {{ participant.housenumber }}{{ participant.addition }}
            </span>
          </div>
          <div class="data-item">
            <span class="label">Telefoon:</span>
            <span class="value">{{ participant.phone || '-' }}</span>
          </div>
          <div class="data-item">
            <span class="label">E-mail:</span>
            <span class="value">{{ participant.email || '-' }}</span>
          </div>
        </div>
      </div>

      <button @click="handleFinish" class="finish-btn">
        Boeking Voltooien
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
})

// this is where the stuff will be logged in the console.
const handleFinish = () => {
  console.log('=== FINAL BOOKING DATA ===')
  console.log('Main Person:', props.formData.mainPerson)
  console.log('Participants:', props.formData.participants)
  console.log('Total Participants:', props.formData.participants.length)
  console.log('Extras:', props.formData.extras)
  console.log('Lifestyle:', props.formData.lifestyle)
  alert('Check de console!')
}
</script>

<style scoped>
.form-container {
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

.header {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  border: 1px solid #e5ddd0;
  margin-bottom: 1.5rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 600;
}

.subtitle {
  color: #4a4a4a;
  margin: 0;
  font-size: 1rem;
}

.summary-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-card {
  background: #ffffff;
  border: 1px solid #e5ddd0;
  border-radius: 12px;
  padding: 2rem;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

h3 {
  color: #1a1a1a;
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e5ddd0;
}

.data-grid {
  display: grid;
  gap: 1rem;
}

.data-item {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f5f5f5;
}

.data-item:last-child {
  border-bottom: none;
}

.label {
  color: #4a4a4a;
  font-weight: 500;
  font-size: 0.95rem;
}

.value {
  color: #1a1a1a;
  font-size: 0.95rem;
  word-break: break-word;
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

.finish-btn {
  background: #556B2f;
  border: none;
  border-radius: 8px;
  padding: 1.25rem 2.5rem;
  font-size: 1.1rem;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
  width: 100%;
  max-width: 300px;
  margin: 1rem auto 0;
  display: block;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.finish-btn:hover {
  background: #4a5f3d;
}

@media (max-width: 768px) {
  .form-container {
    padding: 0 0.5rem;
    margin: 1rem auto;
  }
  
  .header {
    padding: 1.25rem 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
  }
  
  .section-card {
    padding: 1.5rem;
  }

  .data-item {
    grid-template-columns: 1fr;
    gap: 0.25rem;
    padding: 0.5rem 0;
  }

  .label {
    font-weight: 600;
  }

  .finish-btn {
    max-width: 100%;
  }

p {
  font-family: 'Lato', sans-serif;
}
}
</style>