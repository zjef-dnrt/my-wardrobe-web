<template>
  <div class="tw-w-screen tw-h-screen tw-bg-mistyRose-600">
    <div class="tw-flex">
      <aside
        class="tw-w-80 tw-h-screen tw-flex tw-flex-col tw-bg-mistyRose-600 neumorph"
      >
        <div class="tw-h-16 tw-flex tw-items-center">
          <div
            class="tw-w-10 tw-h-10 tw-mx-4 tw-shadow-md tw-justify-self-center tw-rounded-full tw-flex tw-justify-center tw-items-center tw-overflow-hidden"
          >
            <font-awesome-icon
              v-if="!avatarURL"
              icon="user-circle"
              class="tw-text-5xl tw-text-mistyRose-800"
            />
            <img
              v-else
              :src="avatarURL"
              class="tw-object-cover tw-flex-grow"
              alt="user avatar"
            />
          </div>
          <div class="tw-flex tw-flex-col tw-text-darkPurple-400">
            <p>{{ username }}</p>
          </div>
        </div>
        <hr class="tw-mx-2 tw-border-darkPurple-200" />
        <section class="tw-w-full tw-flex-grow tw-p-5">
          <div
            class="tw-flex tw-mb-6 tw-justify-between tw-items-center hover:tw-cursor-pointer"
          >
            <NuxtLink
              to="/dashboard"
              class="tw-w-full tw-text-xl hover:tw-translate-x-2 tw-transition-all"
            >
              My Closet
            </NuxtLink>
            <client-only>
              <font-awesome-icon icon="arrow-right-long" />
            </client-only>
          </div>
          <div>
            <div class="tw-flex tw-mb-3 tw-justify-between tw-items-center">
              <p>Categories</p>
              <Loading v-if="pending" />
              <client-only v-else><AddCategoryButton /></client-only>
            </div>
            <client-only>
              <NuxtLink
                v-for="cat in categories"
                :key="cat.name"
                :to="`/categories/${cat.name}`"
                class="tw-flex tw-my-2 tw-justify-between tw-items-center"
              >
                <p
                  class="tw-text-sm tw-w-full tw-text-mistyRose-800 hover:tw-translate-x-2 tw-transition-all"
                >
                  {{ capitalize(cat.name) }}
                </p>
                <div
                  class="tw-w-12 tw-flex tw-justify-center tw-items-center tw-rounded-full tw-bg-darkSienna-200 tw-text-darkSienna-300 tw-font-bold tw-text-sm"
                >
                  {{ cat.clothes_amount }}
                </div>
              </NuxtLink>
            </client-only>
          </div>
          <div>
            <div
              class="tw-flex tw-mt-6 tw-mb-3 tw-justify-between tw-items-center"
            >
              <p>Locations</p>
              <Loading v-if="pending" />
            </div>
            <client-only>
              <NuxtLink
                v-for="loc in locations"
                :key="loc.name"
                :to="`/${loc.name}`"
                class="tw-block tw-my-2"
              >
                <p
                  class="tw-text-sm tw-w-full tw-text-mistyRose-800 hover:tw-translate-x-2 tw-transition-all"
                >
                  {{ capitalize(loc.name) }}
                </p>
              </NuxtLink>
            </client-only>
          </div>
        </section>
        <div
          class="tw-w-full tw-flex tw-justify-center tw-items-center tw-py-2 tw-px-6"
        >
          <button
            class="tw-flex-grow tw-bg-helioGray-600 tw-py-3 tw-shadow-sm tw-rounded-md"
            @click="signOut"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main class="tw-w-full tw-px-7 tw-pt-10">
        <slot />
        <AlertBox />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { capitalize } from "@/util/string";

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const avatarURL = user.value?.user_metadata?.avatar_url;
const username = user.value?.user_metadata?.name;

const { categories, fetchCategories } = useCategoriesStore();
const { locations, fetchLocations } = useLocationsStore();

const { pending } = await useAsyncData(
  "categories-locations",
  async () => await Promise.all([fetchCategories(), fetchLocations()])
);

const signOut = async () => {
  await supabase.auth.signOut();
  // TODO clear the stores
  navigateTo("/login");
};
</script>
