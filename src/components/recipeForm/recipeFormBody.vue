<template>
  <li class="list-group-item">
    <form>
      <!-- General Information Start -->
      <div>
        <p class="my-3 fs-5 fw-semibold">General Information</p>
        <div>
          <!-- Image Start -->
          <div class="mb-3">
            <base-input type="file" identity="recipeImage" label="Recipe Image" @input="checkImage"></base-input>
          </div>
          <!-- Image End -->

          <!-- Recipe Title Start -->
          <div class="mb-3">
            <base-input type="text" identity="recipeTitle" label="Recipe Title" v-model="newRecipeData.name"></base-input>
          </div>
          <!-- Recipe Title  End -->

          <!-- Recipe Description Start -->
          <div class="mb-3">
            <BaseTextarea identity="recipeDescription" label="Description" placeholder="Share the special story behind your recipe" v-model="newRecipeData.description"></BaseTextarea>
          </div>
          <!-- Recipe Description End -->

          <!-- Recipe Category Start -->
          <div class="mb-3">
            <BaseSelect :data="['Breakfast', 'Meal', 'Lunch', 'Dinner', 'Snack']" v-model="newRecipeData.category"> </BaseSelect>
          </div>
          <!-- Recipe Category End -->
        </div>
      </div>
      <!-- General Information End -->

      <!-- Time Setting Start -->
      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Time Setting</p>
        <div>
          <!-- Preparation Time Start -->
          <div class="mb-3">
            <base-input type="number" identity="prepTime" label="Prep Time" placeholder="0" v-model="newRecipeData.prepTime"></base-input>
          </div>
          <!-- Preparation Time End -->

          <!-- Cook Time Start -->
          <div class="mb-3">
            <base-input type="number" identity="cookTime" label="Cook Time" placeholder="0" v-model="newRecipeData.cookTime"></base-input>
          </div>
          <!-- Cook Time End -->

          <!-- Total Time Start -->
          <div class="mb-3">
            <base-input type="number" identity="totalTime" label="Total Time" placeholder="0" v-model="newRecipeData.totalTime" @focusing="sumTime"></base-input>
          </div>
          <!-- Total Time End -->
        </div>
      </div>
      <!-- Time Setting End -->

      <!-- Ingredients Start -->
      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Ingredients</p>
        <p>
          Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped). Use optional headers to organize the different parts of the recipe (i.e. Cake, Frosting,
          Dressing).
        </p>
        <div>
          <div v-for="count in ingredientCount" :key="count">
            <div class="mb-3 row">
              <!-- Ingredient Input Start -->
              <div class="col-lg-11 col-11">
                <base-input type="text" identity="ingredient" label="Recipe Ingredient" placeholder="Ex: 1 shovel of sugar" v-model="newRecipeData.ingredients[count - 1]"></base-input>
              </div>
              <!-- Ingredient Input End -->
              <div class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient" style="color: #cb3a31; cursor: pointer" v-if="ingredientCount > 1" @click="deleteIngredient(count)">
                <i class="fa-regular fa-trash-can px-1"></i><span class="d-none d-md-inline">Delete</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Add More Button Start -->
        <BaseButton class="new-ingredient-btn px-3 py-2" type="button" @clickButton="addIngredient"> Add More </BaseButton>
        <!-- Add More Button Start -->
      </div>
      <!-- Ingredients End -->

      <!-- Direction Start -->
      <div class="border-top my-3">
        <p class="my-3 fs-5 fw-semibold">Directions</p>
        <p>Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc. Use optional headers to organize the different parts of the recipe</p>
        <div>
          <div v-for="count in directionCount" :key="count">
            <div class="mb-3 row">
              <!-- Direction Input Start -->
              <div class="col-lg-11 col-11">
                <base-input type="text" identity="direction" label="Recipe Guide" placeholder="Ex: mix a shovel of sugar with chocolate" v-model="newRecipeData.directions[count - 1]"></base-input>
              </div>
              <!-- Direction Input End -->
              <div class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient" style="color: #cb3a31; cursor: pointer" v-if="directionCount > 1" @click="deleteDirection(count)">
                <i class="fa-regular fa-trash-can px-1"></i><span class="d-none d-md-inline">Delete</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Add More Button Start -->
        <BaseButton class="new-ingredient-btn px-3 py-2" type="button" @clickButton="addDirection"> Add More </BaseButton>
        <!-- Add More Button End -->
      </div>
      <!-- Direction End -->

      <!-- Form Button Start -->
      <div class="border-top py-3 d-flex my-4 justify-content-end">
        <!-- Cancel Button Start -->
        <BaseButton class="cancel-btn px-3 py-2" type="button"> Cancel </BaseButton>
        <!-- Cancel Button End -->

        <!-- Submit Button Start -->
        <BaseButton class="new-ingredient-btn px-3 py-2" type="submit"> Submit </BaseButton>
        <!-- Submit Button End -->
      </div>
      <!-- Form Button End -->
    </form>
  </li>
</template>
<script setup>
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import BaseSelect from "../ui/BaseSelect.vue";
import BaseTextarea from "../ui/BaseTextarea.vue";
import { reactive, ref } from "vue";
const newRecipeData = reactive({
  imageLink: "",
  name: "",
  description: "",
  category: "",
  prepTime: "",
  cookTime: "",
  totalTime: "",
  ingredients: [],
  directions: [],
});
const ingredientCount = ref(1);
const directionCount = ref(1);
function addIngredient() {
  ingredientCount.value += 1;
}
function addDirection() {
  directionCount.value++;
}
function deleteIngredient(index) {
  newRecipeData.ingredients.splice(index - 1, 1);
  ingredientCount.value--;
}
function deleteDirection(index) {
  newRecipeData.directions.splice(index - 1, 1);
  directionCount.value--;
}
function sumTime() {
  newRecipeData.totalTime = parseInt(newRecipeData.prepTime) + parseInt(newRecipeData.cookTime);
}
function checkImage(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
    newRecipeData.imageLink = reader.result;
  });
}
</script>
