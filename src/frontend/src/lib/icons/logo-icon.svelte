<script>
  export let className = "";
  export let fill = ""
</script>
<svg xmlns="http://www.w3.org/2000/svg"
  class={className}
  fill="none"
  viewBox="0 0 200 200">    
  <defs>
    <linearGradient id="grass-sky" x1="0" y1="1" x2="0" y2="0">
      <stop offset="50%" stop-color="#2D7B66" />
      <stop offset="50%" stop-color="#2D5D7A" />
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="100" fill="url(#grass-sky)" />
      
  <!-- Golf Ball -->
  <circle cx="100" cy="100" r="50" fill="#FFFFFF" stroke-width="1"/>
  
  <!-- Dimples on Golf Ball -->
  <defs>
    <pattern id="dimples" patternUnits="userSpaceOnUse" width="10" height="10">
      <circle cx="1" cy="1" r="1" fill="#2D5D7A" />
    </pattern>
  </defs>
  <circle cx="100" cy="100" r="46" fill="url(#dimples)" />

  <circle cx="100" cy="100" r="50" fill="none" stroke="#2D5D7A" stroke-width="4"/>

  <circle cx="100" cy="100" r="99.5" stroke="#D9EDFA" stroke-width="1"/>
</svg>