<script>
    export let courseGoalText
</script>

<style>
    .course-goal-red {
        color: red;
    }
</style>

<div>
    <h1 class:course-goal-red={courseGoalText.search("!")>0}>{courseGoalText}</h1>
</div>