<template>
  <div class="contain">
   
    <div class="center">
     <transition-group
        appear
        name="animate__animated animate__bounce"
        leave-active-class="animate__fadeOutUp"
        style="display: flex; width: 100%; flex-wrap: wrap"
      >
        <div
          :class="curentIndex == index ? 'add_active' : 'add1'"
          v-for="(item, index) in adress_arr"
          :key="index"
          v-show="item.display"
          @click="to_active(index)"
        >
          <div class="add1_content">
            <p class="p1">{{ item.name }}</p>
            <p class="p2">{{ item.phone }}</p>
            <p class="p3">
              {{ item.adress }}
            </p>
            <p class="p4">
              <span class="sp1">设为默认地址</span>
              <span class="sp1" @click="del_adress(index)">删除</span>
              <span class="sp1" @click="to_add(index, 'edit')">编辑</span>
            </p>
          </div>
        </div>
        <div class="add" @click="to_add(-1, 'add')" :key="120">
          <img class="img" src="../assets/img/3.png" />
          <span class="addadress">添加收货地址</span>
        </div>
        </transition-group>
    </div>
      
  </div>
</template>

<script>
export default {
  // props:['adress_arr'],
  created() {
    this.http
      .get({
        url: "/common/disAdress",
        params: {
          username: window.localStorage.getItem('username'),
        },
      })
      .then((val) => {
        let msg = val.data.data;
        // console.log("ssss",msg)
        msg.forEach((e) => {
          e.display = true;
          this.adress_arr.push(e);
        });
      });
  },
  mounted() {},
  data() {
    return {
      curentIndex: 0,
      add1: "add1",
      // adress_msg: [],
      adress_arr: [],
    };
  },
  methods: {
    to_active(index) {
      this.curentIndex = index;
      // console.log(this.adress_arr[index]);
    },
    to_add(index, flag) {
      if (flag == "add") this.$emit("addFlag");
      else this.$emit("addFlag", this.adress_arr[index]);
    },
    del_adress(index) {
      this.adress_arr[index].display = false;
      console.log(this.adress_arr[index]);
      this.http.get({
        url: "/common/deleteAdress",
        params: {
          adressId: this.adress_arr[index].adressId,
        },
      });
    },
  },
};
</script>

<style scoped>
.contain {
  background-color: #f9f9f9;
  width: 100%;
  margin-top: 1.2rem;
}

.center {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  background-color: white;
  height: 100%;

  padding: 5rem 0;
}

.p1 {
  font-weight: 800;
  line-height: 11px;
  margin-top: 30px;
  margin-left: 8px;
}

.p2 {
  font-weight: 800;
  line-height: 11px;
  margin-top: 20px;
  margin-left: 8px;
}

.p3 {
  margin-top: 20px;
  margin-left: 8px;
}

.p4 {
  margin: 1rem;
  float: right;
  visibility: hidden;
}

.p4 span {
  margin-right: 10px;
}

.sp1:hover {
  color: #ffc934;
  cursor: pointer;
}

.add1_content {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 15px;
}

.add,
.add1,
.add_active {
  width: 280px;
  border: 1px solid #e7e1e1;
  margin-top: 1rem;
  margin-left: 40px;
  padding: 1rem 0;
  cursor: pointer;
}

.add_active {
  border: 1px solid black;
}

.add1:hover {
  border: 1px solid black;
}

.add_active:hover .p4 {
  visibility: visible;
}

.add1:hover .p4 {
  visibility: visible;
}

.add {
  width: 280px;
  height: 200px;
  border: 1px solid #888888;
  margin-left: 40px;
  padding-bottom: 3px;
  cursor: pointer;
}

.add:hover {
  border: 1px solid black;
}

.img {
  position: relative;
  width: 50px;
  margin-top: 20%;
  margin-left: 40%;
  float: left;
}

.add:hover img {
  position: relative;
  width: 50px;
  margin-top: 20%;
  margin-left: 40%;
  float: left;
  content: url("../assets/img/add2.png");
  width: 50px;
}

.addadress {
  position: relative;
  float: left;
  margin-top: 5%;
  margin-left: 33%;
}
</style>
