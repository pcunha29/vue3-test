import { defineStore } from "pinia";
import { onMounted, ref } from "vue";

interface Comment {
  name: string;
  text: string;
  isEditable: boolean;
}

export const useCommentStore = defineStore("commentStore", () => {
  const newComment = {
    name: "",
    text: "",
  };

  const comments = ref<Comment[]>([
    { name: "John Doe", text: "Great product!", isEditable: false },
    { name: "Pedro", text: "Amazing!", isEditable: false },
    { name: "André", text: "WOW!", isEditable: false },
  ]);
  const editingIndex = ref<number | null>(null);
  const editingText = ref("");

  onMounted(() => {
    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      comments.value = JSON.parse(savedComments);
    }
  });

  const submitComment = async () => {
    if (newComment.name && newComment.text) {
      try {
        // Assuming an API call using POST to submit a new comment
        /*
        const response = await fetch('/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComment),
        });
        const result = await response.json();
        comments.value.push(result);
        */

        // For this demo I am simulating this with a local push and
        // saving to localStorage
        comments.value.push({ ...newComment, isEditable: true });
        localStorage.setItem("comments", JSON.stringify(comments.value));

        // Reset new comment fields
        newComment.name = "";
        newComment.text = "";
      } catch (error) {
        console.log("Failed to submit comment:", error);
      }
    } else {
      alert("Please fill out both fields.");
    }
  };

  const allowEditComment = (index: number) => {
    editingIndex.value = index;
    editingText.value = comments.value[index].text; // Pre-fill with current comment text
  };

  const submitEditComment = async (index: number) => {
    /*
      Example PATCH/PUT call:
      const response = await fetch(`/api/comments/${index}`, {
        method: 'PATCH', // or 'PUT' if full replacement
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: updatedText }),
      });
      const result = await response.json();
      comments.value[index].text = result.text;
      */

    try {
      comments.value[index].text = editingText.value;
      editingIndex.value = null; // Close editing mode after saving
    } catch (error) {
      console.log("Failed to update comment:", error);
    }
  };

  return {
    comments,
    submitComment,
    allowEditComment,
    submitEditComment,
    editingIndex,
    editingText,
    newComment,
  };
});
