<template>
  <div>
    <Listbox 
      :options="qadesmg.parent" 
      @selected="selectedqa" 
      @selectedid="selectedqaid" 
    />
    {{Math.round(total)}}
    <!-- radio -->
    <!-- default -->
    <div 
      v-if="selectedid !== 3" 
      class="m-3"
    >
      <div 
        v-for="q in qadesmg.parent.filter((t) => t.title === 'Default').map((c) => c.child)[0]" 
        :key="q.id"
      >
        <h3 class="font-semibold text-gray-900">{{q.title}}</h3>
        <div 
          v-for="c in qadesmg.children.filter((i) => i.childid == q.id)" 
          :key="c.id" 
          class="flex justify-between m-2 p-2 border-b border-b-gray-100 dark:border-b-gray-200"
        >
          <div class="flex items-center mr-4">
            <p class="text-gray-900">{{c.title}}</p>
          </div>
          <!-- <div class="flex">
            <div class="flex items-center mr-4">
              <input :id="`${c.id}yes`" type="radio" :value="q.percentage/qadesmg.children.filter((i) => i.childid == q.id).length" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label :for="c.title" class="ml-2 text-sm">Yes</label>
            </div>
            <div class="flex items-center mr-4">
                <input :id="`${c.id}no`" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label :for="c.title" class="ml-2 text-sm">No</label>
            </div>
            <div class="flex items-center mr-4">
                <input :id="`${c.id}na`" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label :for="c.title" class="ml-2 text-sm">N/A</label>
            </div>
          </div> -->
          <RadioGroup :options="defchoices" @checked="checkeddef($event, c.id, c.pc)" />
        </div>
      </div>
      <!-- gif - social viedos -->
      <div v-if="selectedid === 1 || selectedid === 2">
        <h3 class="font-semibold text-gray-900">{{ selected }}</h3>
        <div 
          v-for="c in qadesmg.children.filter((i) => i.parentid === selectedid)" 
          :key="c.id" 
          class="flex justify-between m-2 p-2 border-b border-b-gray-100 dark:border-b-gray-200"
        >
            <div class="flex items-center mr-4">
              <p class="text-gray-900">{{c.title}}</p>
            </div>
            <div class="flex">
              <RadioGroup :options="defchoices" @checked="checkeddef($event, c.id)" />
              <!-- <div class="flex items-center mr-4">
                <input id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="inline-radio" class="ml-2 text-sm">Yes</label>
              </div>
              <div class="flex items-center mr-4">
                  <input id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label for="inline-radio" class="ml-2 text-sm">No</label>
              </div>
              <div class="flex items-center mr-4">
                  <input id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label for="inline-radio" class="ml-2 text-sm">N/A</label>
              </div> -->
            </div>
          </div>
      </div>
    </div>

    <!-- stars -->
    <!-- svg -->
    <div v-if="selectedid === 3">
      SVG
    </div>
  </div>
</template>

<script>
import store from '~~/store';

export default {
  setup() {
    const qadesmg = store.state.qadesmg.data;
    const grpid = store.state.user.group_id;
    const notmg = ["GIF", "Social Videos"];
    const selected = ref([]);
    const selectedid = ref([]);
    const selqa = ref([]);
    const choices = ref([]);
    const defchoices = ref([]);
    const defchild = ref([]);
    const total = ref();

    if(grpid == 'KX724M7I') {
      for (let i = 0; i < notmg.length; i++) {
        qadesmg.parent.splice(!qadesmg.parent.includes(notmg[i]), 1)
      }
    }

    const d = qadesmg.parent.filter((t) => t.title === 'Default').map((c) => c.child).flat();
    const defparent = d.map((i) => i.id);
    defchild.value = qadesmg.children.filter((id) => defparent.includes(id.childid));
    // console.log(qadesmg.children.filter((id) => defparent.includes(id.childid)))
    const parentpercent = d.map((p) => p.percentage)
    // for(let i = 0; i < defchild.value.length; i++) {
    //   // console.log({ "title": "Yes", "id": defchild.value.map((i) => i.id)[i]})
    //   // defchild.value = qadesmg.children.filter((c) => c.childid === defparent[i])
    //   // console.log(defparent[i])
    //   // console.log(defchild.value)
    //   // console.log(qadesmg.children.filter((c) => c.childid.some))
    //   // const parentpercent = d.filter((id) => id.id == defparent[i]).map((p) => p.percentage)
    //   defchoices.value = [
    //     { id: 0, title: "Yes", optionid: defchild.value.map((i) => i.id)[i] },
    //     { id: 1, title: "No", optionid: defchild.value.map((i) => i.id)[i] },
    //     { id: 2, title: "N/A", optionid: defchild.value.map((i) => i.id)[i]},
    //   ]
    //   console.log(defchoices.value)
    // }
    defchoices.value = [
        { id: 0, title: "Yes" },
        { id: 1, title: "No" },
        { id: 2, title: "N/A" },
      ]

    // const p = qadesmg.parent.map((c) => c.child)
    total.value = defchild.value.reduce((acc, o) => acc + (o.percentage), 0)
    console.log()
    function selectedqa(val) {
      selected.value = val
    }
    function selectedqaid(id) {
      selectedid.value = id
      defchild.value = defchild.value.flat().concat(qadesmg.children.filter((i) => i.parentid === id))
      console.log(defchild.value)
      // console.log(defchild.value.reduce((acc, o) => acc + (o.percentage), 0))
      total.value = defchild.value.reduce((acc, o) => acc + (o.add), 0)
      // selqa.value = qadesmg.parent.filter((i) => i.id === id)
      // const childlength = qadesmg.children.filter((i) => i.parentid === id).length
      // const percent = selqa.value.map((p) => p.percentage)
      // choices.value = [
      //   { id: 0, title: "Yes", percentage: (percent/childlength) },
      //   { id: 1, title: "No", percentage: 0},
      //   { id: 2, title: "N/A", percentage: (percent/childlength)},
      // ]
      // console.log(selqa.value.map((p) => p.percentage))
    }
    function checkeddef(val, id, pc) {
      // console.log(defchild.value)
      const checkedops = {id: id, value: val, pc: pc}
      // if(checkedops.value === 'N/A') {
      //   console.log(defchild.value)
      //   const sr = defchild.value.filter((i) => i.id == checkedops.id)
      //   const newper = sr.map((p) => p.percentage)[0]/defchild.value.filter((i) => i.id !== checkedops.id).length
      //   console.log(newper)
      //   console.log(sr.map((p) => p.percentage)[0]/defchild.value.filter((i) => i.id !== checkedops.id).length)
      //   console.log(defchild.value.find((i) => i.id != checkedops.id && i.percentage != 0 ).percentage += sr.map((p) => p.percentage)[0]/defchild.value.filter((i) => i.id !== checkedops.id).length)
      //   // for (var i = 0; i < nonzero.value.length; i++){
      //   //   nonzero.value[i] += newper;
      //   // }
      //   // console.log(nonzero.percentage+=newper)
      //   console.log(defchild.value.filter((i) => i.id != checkedops.id && i.percentage != 0 ))
      //   console.log(defchild.value.find(i => i.id === checkedops.id).percentage = 0)
      //   console.log(defchild.value)
      // }
      if(checkedops.value === 'Yes') {
        defchild.value = defchild.value
        defchild.value.find(i => i.id === checkedops.id).ops = "Yes"
        console.log(defchild.value)
      } else if(checkedops.value === 'No') {
        // defchild.value.find(i => i.id == checkedops.id).percentage = 1;
        defchild.value.find(i => i.id === checkedops.id).ops = "No"
        total.value = defchild.value.filter(o => o.ops !== 'No').reduce((acc, o) => acc + (o.percentage), 0)
        console.log(defchild.value)
      } else if(checkedops.value === 'N/A') {
        const cid = defchild.value.filter(i => i.id === checkedops.id);
        const pid = defchild.value.filter(i => i.pc === checkedops.pc);
        const notcid = defchild.value.filter(i => i.id !== checkedops.id);
        const nonzero = defchild.value.filter((p) => p.pc !== checkedops.pc &&  p.ops !== 'N/A');
        const na = defchild.value.find(i => i.id === checkedops.id).ops = "N/A";
        const opswithna = defchild.value.filter(i => i.pc === checkedops.pc && i.ops === "N/A");
        console.log(pid)
        console.log(pid.length)
        console.log(na)
        console.log(opswithna)
        const napertotal = pid.filter(i => i.percentage).reduce((a, o) => a + (o.percentage), 0)
        if(pid.length == opswithna.length) {
          // const parentpercenttotal = pid.reduce((a, p) => a + (p.percentage), 0)
          console.log('napertotal')
          console.log(napertotal)
          // console.log(pid.filter(i => i.percentage-=(cid.map((p) => p.percentage)[0])))
          var count = {};
          nonzero.forEach((i) => { 
            return count[i.pc] = (count[i.pc]||0) + 1
          });
          console.log('nonzero')
          console.log(nonzero)
          console.log(count)
          var arr = [];
          for (var key in count) {
            // console.log(
            //   nonzero.forEach((i) => {
            //     if(i.pc == key) {
            //       console.log(nonzero.filter(i => i.pc == key && (i.percentage+=((count[key]/(100-napertotal))*100))))
            //       // console.log(i.percentage, ((count[key]/(100-napertotal))*100))
            //     }
            //   })
            // )
            // arr.push({pc: key, val: count[key]})
            arr.push(defchild.value.filter(i => i.pc == key && (i.add = ((i.add + (i.percentage/(100-napertotal))*100)))))
          }
          console.log('arr')
          console.log(arr.flat())
          // defchild.value = arr.flat(); //merge defchild and arr
          // // console.log(nonzero.filter(i => i.percentage+=(cid.map((p) => p.percentage)[0]/nonzero.length)))
          // console.log(defchild.value)
          // console.log('nonzero')
          // // console.log(arr.filter((p) => p.pc === '1').map((v) => v.val)[0]/(100-napertotal))
          // // console.log(arr.length)
          // // for (let i = 0; i < arr.length; i++) {
          // //   console.log(arr[i])
          // // }
          // // console.log(nonzero.filter(i => i.percentage+=(arr.filter((p) => p.pc === i.pc.toString()).map((v) => v.val)[0]/(100-napertotal))))
          // console.log(true)
          console.log(defchild.value.filter(o => o.ops !== 'N/A'))
          total.value = defchild.value.reduce((acc, o) => acc + (o.add), 0)
        } else {
          console.log(false)
          console.log(defchild.value)
          defchild.value = defchild.value
          console.log('minus')
          console.log(defchild.value.filter(i => i.add != 0 && (i.add = ((i.add - (i.percentage/(100-napertotal))*100)))))
        }
        console.log(defchild.value)
        // console.log(defchild.value.filter(i => i.id === checkedops.id))
        // console.log(cid.map((p) => p.percentage)[0]/nonzero.length)
        // console.log(nonzero.filter(i => i.percentage+=(cid.map((p) => p.percentage)[0]/nonzero.length)))
        // console.log(defchild.value.find(i => i.id === checkedops.id).percentage = 0)
        // console.log(nonzero)
      } else {
        defchild.value = defchild.value
      }
      // console.log(defchild.value.reduce((acc, o) => acc + (o.percentage), 0))
      // total.value = defchild.value.filter(o => o.ops !== ('No' || 'N/A')).reduce((acc, o) => acc + (o.percentage), 0)
    }
    function checked(val) {
      console.log(val)
    }
    

    return { 
      qadesmg, 
      selectedqa, 
      selected, 
      selectedqaid, 
      selectedid,
      selqa, 
      choices, 
      defchild, 
      // defparent, 
      defchoices, 
      checkeddef,
      checked,
      total,
    }
  }
}
</script>

<style></style>