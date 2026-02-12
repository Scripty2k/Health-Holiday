<template>
  <div class="progress-stepper">
    <div 
      v-for="(step, index) in steps" 
      :key="index"
      class="step-wrapper"
    >
      <div class="step-item">
        <div 
          class="step-circle"
          :class="{ 
            active: currentStep === index + 1,
            completed: currentStep > index + 1,
            clickable: currentStep >= index + 1
          }"
          @click="handleStepClick(index + 1)"
        >
          <svg v-if="currentStep > index + 1" class="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <div class="step-label">{{ step }}</div>
      </div>
      <div 
        v-if="index < steps.length - 1" 
        class="step-line"
        :class="{ completed: currentStep > index + 1 }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    required: true
  },
  currentStep: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['step-click'])

const handleStepClick = (stepNumber) => {
  emit('step-click', stepNumber)
}
</script>

<style scoped>
.progress-stepper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #F5E5D3;
}

.step-wrapper {
  display: flex;
  align-items: center;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #88827F;
  color: white;
  font-weight: 600;
  transition: all 0.3s;
}

.step-circle.clickable {
  cursor: pointer;
}

.step-circle.clickable:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.step-circle.active {
  background: #3A6F72;
  color: white;
  border-color: #3A6F72;
  /* box-shadow: 0 2px 8px rgba(45, 122, 79, 0.3); */
}

.step-circle.completed {
  background: #3A6F72;
  color: white;
  border-color: #3A6F72;
}

.check-icon {
  color: white;
  stroke: white;
}

.step-label {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
  font-family: 'lato', sans-serif;
}

.step-item:has(.step-circle.active) .step-label,
.step-item:has(.step-circle.completed) .step-label {
  color: #1a1a1a;
  font-weight: 600;
}

.step-line {
  width: 150px;
  height: 0;
  border-top: 3px dashed #88827F;
  margin: 0 20px;
  margin-bottom: 28px;
  transition: all 0.3s;
}

.step-line.completed {
  border-color: #666666;
  border-style: dashed;
}

@media (max-width: 768px) {
  .step-line {
    width: 60px;
    margin: 0 10px;
  }
  
  .step-circle {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
  
  .step-label {
    font-size: 0.75rem;
    font-family: 'Lato', sans-serif;
  }

p {
  font-family: 'Lato', sans-serif;
}
}
</style>
