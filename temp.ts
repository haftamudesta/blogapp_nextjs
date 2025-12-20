interface postIdProps{
    params:Promise<{postId:Id<"posts">}>
}

{params}:postIdProps

const {postId}=await params
    const post=await fetchQuery(api.posts.getPostById,{postId:postId})