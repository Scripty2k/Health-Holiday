<template>
  <div class="extras-container">
    <div class="extras-wrapper">
      <h1 class="main-title">Extra bij te boeken</h1>
      <p class="subtitle">Hieronder kun je extra's toevoegen aan jouw boeking.</p>
      <p class="skip-notice">
        <span class="skip-link" @click="handleSkip">Dit kan ook later</span>
      </p>

      <form @submit.prevent="handleSubmit" class="extras-form">
        
        <!-- Ruimbagage heenreis -->
        <div class="collapsible-section">
          <button 
            type="button" 
            class="section-header" 
            @click="toggleSection('luggageOutbound')"
          >
            <i class="fa-light fa-chevron-down chevron" :class="{ open: openSections.luggageOutbound }"></i>
            <span>Ruimbagage heenreis</span>
          </button>
          
          <div v-show="openSections.luggageOutbound" class="section-content">
            <div v-for="(participant, index) in participants" :key="'outbound-' + index" class="participant-group">
              <h4>Deelnemer {{ index + 1 }}</h4>
              
              <label :class="['option-card', { selected: extras.luggageOutbound[index] === '15kg' }]">
                <input 
                  type="radio" 
                  :name="'luggage-outbound-' + index"
                  value="15kg"
                  :checked="extras.luggageOutbound[index] === '15kg'"
                  @change="updateExtra('luggageOutbound', index, '15kg')"
                />
                <span class="option-content">
                  <span class="option-text">
                    15 kg
                    <i class="fa-light fa-circle-question"></i>
                  </span>
                  <span class="option-price">€ 48,00</span>
                </span>
              </label>

              <label :class="['option-card', { selected: extras.luggageOutbound[index] === '23kg' }]">
                <input 
                  type="radio" 
                  :name="'luggage-outbound-' + index"
                  value="23kg"
                  :checked="extras.luggageOutbound[index] === '23kg'"
                  @change="updateExtra('luggageOutbound', index, '23kg')"
                />
                <span class="option-content">
                  <span class="option-text">
                    23 kg
                    <i class="fa-light fa-circle-question"></i>
                  </span>
                  <span class="option-price">€ 58,25</span>
                </span>
              </label>

              <label :class="['option-card', { selected: extras.luggageOutbound[index] === '26kg' }]">
                <input 
                  type="radio" 
                  :name="'luggage-outbound-' + index"
                  value="26kg"
                  :checked="extras.luggageOutbound[index] === '26kg'"
                  @change="updateExtra('luggageOutbound', index, '26kg')"
                />
                <span class="option-content">
                  <span class="option-text">
                    26 kg
                    <i class="fa-light fa-circle-question"></i>
                  </span>
                  <span class="option-price">€ 61,85</span>
                </span>
              </label>

              <label :class="['option-card', { selected: extras.luggageOutbound[index] === 'none' }]">
                <input 
                  type="radio" 
                  :name="'luggage-outbound-' + index"
                  value="none"
                  :checked="extras.luggageOutbound[index] === 'none'"
                  @change="updateExtra('luggageOutbound', index, 'none')"
                />
                <span class="option-content">
                  <span class="option-text">Nee, ik wil geen ruimbagage</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Ruimbagage terugreis -->
        <div class="collapsible-section">
          <button 
            type="button" 
            class="section-header" 
            @click="toggleSection('luggageReturn')"
          >
            <i class="fa-light fa-chevron-down chevron" :class="{ open: openSections.luggageReturn }"></i>
            <span>Ruimbagage terugreis</span>
          </button>
          
          <div v-show="openSections.luggageReturn" class="section-content">
            <div v-for="(participant, index) in participants" :key="'return-' + index" class="participant-group">
              <h4>Deelnemer {{ index + 1 }}</h4>
              
              <label :class="['option-card', { selected: extras.luggageReturn[index] === '15kg' }]">
                <input 
                  type="radio" 
                  :name="'luggage-return-' + index"
                  value="15kg"
                  :checked="extras.luggageReturn[index] === '15kg'"
                  @change="updateExtra('luggageReturn', index, '15kg')"
                />
                <span class="option-content">
                  <span class="option-text">
                    15 kg
                    <i class="fa-light fa-circle-question"></i>
                  </span>
                  <span class="option-price">€ 48,00</span>
                </span>
              </label>

              <label :class="['option-card', { selected: extras.luggageReturn[index] === '23kg' }]">
                <input 
                  type="radio" 
                  :name="'luggage-return-' + index"
                  value="23kg"
                  :checked="extras.luggageReturn[index] === '23kg'"
                  @change="updateExtra('luggageReturn', index, '23kg')"
                />
                <span class="option-content">
                  <span class="option-text">
                    23 kg
                    <i class="fa-light fa-circle-question"></i>
                  </span>
                  <span class="option-price">€ 58,25</span>
                </span>
              </label>

              <label :class="['option-card', { selected: extras.luggageReturn[index] === '26kg' }]">
                <input 
                  type="radio" 
                  :name="'luggage-return-' + index"
                  value="26kg"
                  :checked="extras.luggageReturn[index] === '26kg'"
                  @change="updateExtra('luggageReturn', index, '26kg')"
                />
                <span class="option-content">
                  <span class="option-text">
                    26 kg
                    <i class="fa-light fa-circle-question"></i>
                  </span>
                  <span class="option-price">€ 61,85</span>
                </span>
              </label>

              <label :class="['option-card', { selected: extras.luggageReturn[index] === 'none' }]">
                <input 
                  type="radio" 
                  :name="'luggage-return-' + index"
                  value="none"
                  :checked="extras.luggageReturn[index] === 'none'"
                  @change="updateExtra('luggageReturn', index, 'none')"
                />
                <span class="option-content">
                  <span class="option-text">Nee, ik wil geen ruimbagage</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Transfer heenreis -->
        <div class="collapsible-section">
          <button 
            type="button" 
            class="section-header" 
            @click="toggleSection('transferOutbound')"
          >
            <i class="fa-light fa-chevron-down chevron" :class="{ open: openSections.transferOutbound }"></i>
            <span>Transfer heenreis</span>
          </button>
          
          <div v-show="openSections.transferOutbound" class="section-content">
            <label :class="['option-card', { selected: extras.transferOutbound === 'group_transfer' }]">
              <input 
                type="radio" 
                name="transfer-outbound"
                value="group_transfer"
                :checked="extras.transferOutbound === 'group_transfer'"
                @change="updateSingleExtra('transferOutbound', 'group_transfer')"
              />
              <span class="option-content">
                <span class="option-text">
                  Groepstransfer
                    <i class="fa-light fa-circle-question"></i>
                </span>
                <span class="option-price">€ 50,00</span>
              </span>
            </label>

            <label :class="['option-card', { selected: extras.transferOutbound === 'private' }]">
              <input 
                type="radio" 
                name="transfer-outbound"
                value="private"
                :checked="extras.transferOutbound === 'private'"
                @change="updateSingleExtra('transferOutbound', 'private')"
              />
              <span class="option-content">
                <span class="option-text">
                  Privé transfer
                    <i class="fa-light fa-circle-question"></i>
                </span>
                <span class="option-price">€ 80,00</span>
              </span>
            </label>

            <label :class="['option-card', { selected: extras.transferOutbound === 'none' }]">
              <input 
                type="radio" 
                name="transfer-outbound"
                value="none"
                :checked="extras.transferOutbound === 'none'"
                @change="updateSingleExtra('transferOutbound', 'none')"
              />
              <span class="option-content">
                <span class="option-text">Nee, ik wil geen transfer</span>
              </span>
            </label>
          </div>
        </div>

        <!-- Transfer terugreis -->
        <div class="collapsible-section">
          <button 
            type="button" 
            class="section-header" 
            @click="toggleSection('transferReturn')"
          >
            <i class="fa-light fa-chevron-down chevron" :class="{ open: openSections.transferReturn }"></i>
            <span>Transfer terugreis</span>
          </button>
          
          <div v-show="openSections.transferReturn" class="section-content">
            <label :class="['option-card', { selected: extras.transferReturn === 'group_transfer' }]">
              <input 
                type="radio" 
                name="transfer-return"
                value="group_transfer"
                :checked="extras.transferReturn === 'group_transfer'"
                @change="updateSingleExtra('transferReturn', 'group_transfer')"
              />
              <span class="option-content">
                <span class="option-text">
                  Groepstransfer
                  <i class="fa-light fa-circle-question"></i>
                </span>
                <span class="option-price">€ 50,00</span>
              </span>
            </label>

            <label :class="['option-card', { selected: extras.transferReturn === 'private' }]">
              <input 
                type="radio" 
                name="transfer-return"
                value="private"
                :checked="extras.transferReturn === 'private'"
                @change="updateSingleExtra('transferReturn', 'private')"
              />
              <span class="option-content">
                <span class="option-text">
                  Privé transfer
                  <i class="fa-light fa-circle-question"></i>
                </span>
                <span class="option-price">€ 80,00</span>
              </span>
            </label>

            <label :class="['option-card', { selected: extras.transferReturn === 'none' }]">
              <input 
                type="radio" 
                name="transfer-return"
                value="none"
                :checked="extras.transferReturn === 'none'"
                @change="updateSingleExtra('transferReturn', 'none')"
              />
              <span class="option-content">
                <span class="option-text">Nee, ik wil geen transfer</span>
              </span>
            </label>
          </div>
        </div>

        <!-- Reisverzekering -->
        <div class="collapsible-section">
          <button 
            type="button" 
            class="section-header" 
            @click="toggleSection('travelInsurance')"
          >
            <i class="fa-light fa-chevron-down chevron" :class="{ open: openSections.travelInsurance }"></i>
            <span>Reisverzekering</span>
          </button>
          
          <div v-show="openSections.travelInsurance" class="section-content">
            <p class="section-description">Tekst met wat uitleg hier.</p>
            
            <div v-for="(participant, index) in participants" :key="'insurance-' + index" class="participant-group">
              <h4>Deelnemer {{ index + 1 }}</h4>
              
              <label :class="['option-card', { selected: extras.travelInsurance[index] === 'basis' }]">
                <input 
                  type="radio" 
                  :name="'travel-insurance-' + index"
                  value="basis"
                  :checked="extras.travelInsurance[index] === 'basis'"
                  @change="updateExtra('travelInsurance', index, 'basis')"
                />
                <span class="option-content">
                  <span class="option-text">
                    Kortlopende reisverzekering Basis
                    <i class="fa-light fa-circle-question"></i>
                  </span>
                  <span class="option-price">€ 7,36</span>
                </span>
              </label>

              <label :class="['option-card', { selected: extras.travelInsurance[index] === 'comfort' }]">
                <input 
                  type="radio" 
                  :name="'travel-insurance-' + index"
                  value="comfort"
                  :checked="extras.travelInsurance[index] === 'comfort'"
                  @change="updateExtra('travelInsurance', index, 'comfort')"
                />
                <span class="option-content">
                  <span class="option-text">
                    Kortlopende reisverzekering Comfort
                    <i class="fa-light fa-circle-question"></i>
                  </span>
                  <span class="option-price">€ 8,16</span>
                </span>
              </label>

              <label :class="['option-card', { selected: extras.travelInsurance[index] === 'optimaal' }]">
                <input 
                  type="radio" 
                  :name="'travel-insurance-' + index"
                  value="optimaal"
                  :checked="extras.travelInsurance[index] === 'optimaal'"
                  @change="updateExtra('travelInsurance', index, 'optimaal')"
                />
                <span class="option-content">
                  <span class="option-text">
                    Kortlopende reisverzekering Optimaal
                    <i class="fa-light fa-circle-question"></i>
                  </span>
                  <span class="option-price">€ 20,96</span>
                </span>
              </label>

              <label :class="['option-card', { selected: extras.travelInsurance[index] === 'none' }]">
                <input 
                  type="radio" 
                  :name="'travel-insurance-' + index"
                  value="none"
                  :checked="extras.travelInsurance[index] === 'none'"
                  @change="updateExtra('travelInsurance', index, 'none')"
                />
                <span class="option-content">
                  <span class="option-text">Nee, ik wil geen verzekering</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Annuleringsverzekering -->
        <div class="collapsible-section">
          <button 
            type="button" 
            class="section-header" 
            @click="toggleSection('cancellationInsurance')"
          >
            <i class="fa-light fa-chevron-down chevron" :class="{ open: openSections.cancellationInsurance }"></i>
            <span>Annuleringsverzekering</span>
          </button>
          
          <div v-show="openSections.cancellationInsurance" class="section-content">
            <p class="section-description">Tekst met wat uitleg hier.</p>
            
            <label :class="['option-card', { selected: extras.cancellationInsurance === 'standard' }]">
              <input 
                type="radio" 
                name="cancellation-insurance"
                value="standard"
                :checked="extras.cancellationInsurance === 'standard'"
                @change="updateSingleExtra('cancellationInsurance', 'standard')"
              />
              <span class="option-content">
                <span class="option-text">
                  Kortlopende annuleringsverzekering
                    <i class="fa-light fa-circle-question"></i>
                </span>
              </span>
            </label>

            <label :class="['option-card', { selected: extras.cancellationInsurance === 'all-risk' }]">
              <input 
                type="radio" 
                name="cancellation-insurance"
                value="all-risk"
                :checked="extras.cancellationInsurance === 'all-risk'"
                @change="updateSingleExtra('cancellationInsurance', 'all-risk')"
              />
              <span class="option-content">
                <span class="option-text">
                  Kortlopende all-risk annuleringsverzekering
                    <i class="fa-light fa-circle-question"></i>
                </span>
                <span class="option-price">€ 286,09</span>
              </span>
            </label>

            <label :class="['option-card', { selected: extras.cancellationInsurance === 'none' }]">
              <input 
                type="radio" 
                name="cancellation-insurance"
                value="none"
                :checked="extras.cancellationInsurance === 'none'"
                @change="updateSingleExtra('cancellationInsurance', 'none')"
              />
              <span class="option-content">
                <span class="option-text">Nee, ik wil geen annuleringsverzekering</span>
              </span>
            </label>
          </div>
        </div>

        <!-- extra stuff -->
        <div class="stay-extras">
          <h3>Voeg toe aan je verblijf</h3>
          
          <label class="checkbox-card">
            <input 
              type="checkbox" 
              :checked="extras.stayExtras.taxi"
              @change="updateStayExtra('taxi', $event.target.checked)"
            />
            <span class="checkbox-content">
              <span class="checkbox-details">
                <span class="checkbox-title">Schiphol Travel Taxi nodig?</span>
                <span class="checkbox-description">Maak het jezelf makkelijk; wij regelen de beste taxi voor je rit</span>
              </span>
              <i class="fa-light fa-plane stay-icon"></i>
            </span>
          </label>

          <label class="checkbox-card">
            <input 
              type="checkbox" 
              :checked="extras.stayExtras.carRental"
              @change="updateStayExtra('carRental', $event.target.checked)"
            />
            <span class="checkbox-content">
              <span class="checkbox-details">
                <span class="checkbox-title">Auto huren?</span>
                <span class="checkbox-description">Maak het jezelf makkelijk; wij vinden de beste deal voor je</span>
              </span>
              <i class="fa-light fa-car stay-icon"></i>
            </span>
          </label>

          <label class="checkbox-card">
            <input 
              type="checkbox" 
              :checked="extras.stayExtras.parking"
              @change="updateStayExtra('parking', $event.target.checked)"
            />
            <span class="checkbox-content">
              <span class="checkbox-details">
                <span class="checkbox-title">Parkeerplek nodig?</span>
                <span class="checkbox-description">Maak het jezelf makkelijk; wij zoeken de beste plek voor je auto</span>
              </span>
              <i class="fa-sharp fa-light fa-circle-parking stay-icon"></i>
            </span>
          </label>
        </div>

        <div class="form-actions">
          <button type="button" @click="handleBack" class="back-btn">
            <i class="fa-regular fa-arrow-left"></i>
            Terug
          </button>
          <button type="submit" class="submit-btn">
            Volgende stap(3)
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  participants: {
    type: Array,
    required: true
  },
  extras: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['next', 'back', 'update:extras'])

const openSections = ref({
  luggageOutbound: true,
  luggageReturn: false,
  transferOutbound: false,
  transferReturn: false,
  travelInsurance: false,
  cancellationInsurance: false
})

const toggleSection = (section) => {
  openSections.value[section] = !openSections.value[section]
}

const updateExtra = (category, index, value) => {
  emit('update:extras', { category, index, value })
}

const updateSingleExtra = (category, value) => {
  emit('update:extras', { category, value })
}

const updateStayExtra = (type, value) => {
  emit('update:extras', { category: 'stayExtras', type, value })
}

const handleBack = () => {
  emit('back')
}

const handleSubmit = () => {
  console.log('Extras submitted:', props.extras)
  emit('next')
}

const handleSkip = () => {
  emit('next')
}
</script>

<style scoped>
.extras-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

.extras-wrapper {
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

.extras-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Collapsible Sections */
.collapsible-section {
  background: white;
  border: 1px solid #e5ddd0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-header {
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: #e8dcc8;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 1.1rem;
  color: #1a1a1a;
  text-align: left;
  transition: background 0.2s;
}

.section-header:hover {
  background: #dfd0b8;
}

.chevron {
  transition: transform 0.3s;
  flex-shrink: 0;
}

.chevron.open {
  transform: rotate(180deg);
}

.section-content {
  padding: 1.5rem;
  background: white;
}

.section-description {
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 0.95rem;
}

.participant-group {
  margin-bottom: 2rem;
  font-family: 'lato', sans-serif;
}

.participant-group:last-child {
  margin-bottom: 0;
}

.participant-group h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

/* Option Cards */
.option-card {
  display: flex;
  padding: 1rem 1.25rem;
  border: 1px solid #666666;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
    font-family: 'lato', sans-serif;
}

.option-card:hover {
  border-color: #3A6F72;
  background: #fafafa;
}

.option-card.selected {
  background: #e8f5f0;
  border-color: #3A6F72;
}

.option-card input[type="radio"] {
  margin-right: 1rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #1b4b30;
}

.option-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.option-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #1a1a1a;
}

.option-price {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1rem;
}

.info-icon {
  flex-shrink: 0;
}

.check-icon {
  margin-right: 0.75rem;
  color: #2d7a4f;
  flex-shrink: 0;
}

/* Stay Extras */
.stay-extras {
  background: white;
  border: 1px solid #e5ddd0;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    font-family: 'lato', sans-serif;
}

.stay-extras h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.checkbox-card {
  display: block;
  padding: 1.25rem;
  border: 1px solid #666666;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.checkbox-card:hover {
  border-color: #3A6F72;
  background: #fafafa;
}

.checkbox-card input[type="checkbox"] {
  margin-right: 1rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #556B2f;
}

.checkbox-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.checkbox-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.checkbox-title {
  font-weight: 600;
  font-size: 1rem;
  color: #1a1a1a;
}

.checkbox-description {
  font-size: 0.875rem;
  color: #666;
}

.stay-icon {
  color: #666;
  flex-shrink: 0;
  font-size: 25px;
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
  background: #556B2F;
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

@media (max-width: 768px) {
  .main-title {
    font-size: 1.5rem;
  }

  .section-header {
    padding: 1rem;
    font-size: 1rem;
  }

  .section-content {
    padding: 1rem;
  }

  .option-card {
    padding: 0.875rem 1rem;
  }

  .checkbox-card {
    padding: 1rem;
  }

  .stay-extras {
    padding: 1.5rem;
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
