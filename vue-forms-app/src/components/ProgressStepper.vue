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
  background: #FAF4E4;
}

.step-wrapper {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 60px;
}

.step-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #88827F;
  color: #FAF4E5;
  font-weight: 600;
  transition: all 0.3s;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
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
  color: #FAF4E5;
  border-color: #3A6F72;
}

.step-circle.completed {
  background: #3A6F72;
  color: #FAF4E5;
  border-color: #3A6F72;
}

.check-icon {
  color: #FAF4E5;
  stroke: white;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.step-label {
  font-size: 0.75rem;
  color: #666;
  font-weight: 500;
  font-family: 'Lato', sans-serif;
  text-align: center;
  max-width: 90px;
  word-wrap: break-word;
  hyphens: auto;
  line-height: 1.2;
  min-height: 2.4em;
  max-height: 2.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.step-item:has(.step-circle.active) .step-label,
.step-item:has(.step-circle.completed) .step-label {
  color: #1a1a1a;
  font-weight: 600;
}

.step-line {
  width: 80px;
  height: 0;
  border-top: 1px dashed #88827F;
  margin: 0 10px;
  margin-bottom: 26px;
  transition: all 0.3s;
  flex-shrink: 0;
}

.step-line.completed {
  border-color: #666666;
}

@media (max-width: 1024px) {
  .step-line {
    width: 100px;
    margin: 0 15px;
  }
  
  .step-label {
    font-size: 0.8rem;
    max-width: 100px;
  }
}

@media (max-width: 768px) {
  .progress-stepper {
    padding: 15px 10px;
  }
  
  .step-line {
    width: 50px;
    margin: 0 6px;
  }
  
  .step-circle {
    width: 34px;
    height: 34px;
    font-size: 0.85rem;
  }
  
  .step-label {
    font-size: 0.68rem;
    max-width: 75px;
  }
  
  .step-item {
    min-width: 55px;
  }
}

@media (max-width: 480px) {
  .progress-stepper {
    padding: 10px 5px;
  }
  
  .step-line {
    width: 28px;
    margin: 0 3px;
  }
  
  .step-circle {
    width: 28px;
    height: 28px;
    font-size: 0.75rem;
  }
  
  .check-icon {
    width: 14px;
    height: 14px;
  }
  
  .step-label {
    font-size: 0.6rem;
    max-width: 60px;
    line-height: 1.2;
  }
  
  .step-item {
    min-width: 45px;
    gap: 5px;
  }
}
</style>
