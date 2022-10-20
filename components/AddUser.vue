<template>
  <div>
    <Modal>
      <template #btntitle>
        <span class="block 
          text-white 
          bg-teal-700 
          hover:bg-teal-800 
          focus:ring-2 
          focus:outline-none 
          focus:ring-teal-300 
          font-medium 
          rounded-lg 
          text-sm 
          px-5 
          py-2.5 
          text-center 
          dark:bg-teal-600 
          dark:hover:bg-teal-700 
          dark:focus:ring-teal-800"
          >
            Add User
        </span>
      </template>
      <template #modalbody>
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-black">Add</h3>
        <form class="space-y-6">
          <ComboBox :options="group" 
            :placeholder="`Group`" 
            :header="`Group`" 
            :value="cbTeam" 
            @selectedid="cbTeam" 
          />
          <ComboBoxUsers :options="users"
            :userdb="userdb" 
            :placeholder="`User`" 
            :header="`User`" 
            @selected="cbName" 
          />
          <ComboBox :options="role" 
            :placeholder="`Role`" 
            :header="`Role`" 
            @selectedid="cbRole" 
          />
          <Checkbox :options="querybrands" 
            :placeholder="`Brands`" 
            :header="`Brands`" 
            @selected="cbBrands" 
          />
        </form>
      </template>
      <template #savebtn>
        <button @click.prevent="saveUser" 
          type="submit" 
          class="text-white 
            bg-teal-700 
            hover:bg-teal-800 
            focus:ring-2 
            focus:outline-none 
            focus:ring-teal-300 
            font-medium 
            rounded-lg 
            text-sm 
            px-5 
            py-2.5 
            text-center 
            dark:bg-teal-600 
            dark:hover:bg-teal-700 
            dark:focus:ring-teal-800"
        >
        Save
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "AddUser",
    data() {
      return {}
    },
    props: {
      group: Object,
      users: Object,
      role: Object,
      brands: Object,
      userdb: Object,
    },
    computed: {
      querybrands() {
        const brand = this.brands;
        const brandArr = [];
        for(let i = 0; i < brand.length; i++) {
          const obj = {
            id: i,
            title: brand[i]
          };
          brandArr.push(obj)
        }
        console.log(brandArr)
        return brandArr
      },
    },
    methods: {
      cbTeam(id) {
        this.$emit('cbTeam', id)
        this.cbTeam = id
      },
      cbName(id) {
        // this.$emit('cbName', id)
        this.cbName = id
      },
      cbRole(id) {
        // this.$emit('cbRole', id)
        this.cbRole = id
      },
      cbBrands(values) {
        this.cbBrands = values
        console.log(values)
      },
      async saveUser() {
        const userId = this.cbName;
        const groupId = this.cbTeam;
        const brands = this.cbBrands;
        const role = this.cbRole;
        const router = useRouter();

        try {
          await axios.post('http://localhost:8000/users', {
            user_id: userId,
            group_id: groupId,
            brands: brands.toString(),
            role: role
          });
          // router.push('/users', this.toggleModal());
          router.go('/users');
        } catch (err) {
          console.log(err)
        }
        console.log(userId, brands)
      }
    }
  }
</script>