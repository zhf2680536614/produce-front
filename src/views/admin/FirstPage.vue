<template>
    <div>
        <router-view />
        <div style="background-size:cover;">
            <img id="loginpng" src="../../assets/admin.jpeg" style="width:1800px; opacity: 0.3;">
        </div>
    </div>
</template>

<script>

export default ({
    name: 'firstPage'
});
</script>

<style scoped>
@keyframes wave {
    0% {
        top: -1500px;
        left: -100px;
    }

    10% {
        top: -1400px;
        left: -20px;
    }

    20% {
        top: -1300px;
        left: -100px;
    }

    30% {
        top: -1200px;
        left: -20px;
    }

    40% {
        top: -1100px;
        left: -100px;
    }

    50% {
        top: -1000px;
        left: -20px;
    }

    60% {
        top: -1100px;
        left: -100px;
    }

    70% {
        top: -1200px;
        left: -20px;
    }

    80% {
        top: -1300px;
        left: -100px;
    }

    90% {
        top: -1400px;
        left: -20px;
    }

    100% {
        top: -1500px;
        left: -100px;
    }
}

#loginpng {
    position: fixed;
    left: -100px;
    top: -1500px;
    animation: wave 40s linear infinite;
}
</style>