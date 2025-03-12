<script lang="ts">
    import ListViewPanel from "$lib/components/shared/list-view-panel.svelte";
    import Layout from "../Layout.svelte";

    function createNew(){
        
    }

</script>

<Layout>

    <ListViewPanel title="GOLF COURSES" buttonTitle="ADD GOLF COURSE" buttonCallback={createNew}>


    <!-- 
        Courses Page
        - List all the courses that i have favourited as a user
        - Search for a new course
        - Add it to my favourite courses
        - New Course Button
            - Redirects to view to add a new golf course
        - 


    -->
    </ListViewPanel>
</Layout>