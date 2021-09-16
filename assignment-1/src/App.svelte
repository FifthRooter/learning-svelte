<script>
  import CourseGoal from './CourseGoal.svelte'
  let courseGoalText = ''
</script>

<div>
  <p>Enter course goal</p>
  <input type='text' bind:value={courseGoalText}/>
</div>

<CourseGoal {courseGoalText} />

