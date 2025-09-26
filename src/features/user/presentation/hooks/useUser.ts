
// import type {
//     UpdateUserRequestDto,
//     DeleteUserRequestDto
// } from '../../domain/dtos/UserDto';
// import { useAllUsers, useCurrentUser, useDeleteUser, useUpdateUser, useUserById } from './useUserAPI';

// export const useUser = () => {
//     const allUsersQuery = useAllUsers();
//     const currentUserQuery = useCurrentUser();
//     const updateUserMutation = useUpdateUser();
//     const deleteUserMutation = useDeleteUser();

//     const getUserById = useUserById;

//     const updateUser = async (id: string, userData: UpdateUserRequestDto) => {
//         try {
//             const result = await updateUserMutation.mutateAsync({ id, userData });
//             return result;
//         } catch (error) {
//             throw error;
//         }
//     };

//     const deleteUser = async (request: DeleteUserRequestDto) => {
//         try {
//             await deleteUserMutation.mutateAsync(request);
//         } catch (error) {
//             throw error;
//         }
//     };

//     const clearUserError = () => {
//         updateUserMutation.reset();
//         deleteUserMutation.reset();
//     };

//     return {
//         // Data
//         allUsers: allUsersQuery.data,
//         currentUser: currentUserQuery.data,

//         // Loading states
//         isLoadingAllUsers: allUsersQuery.isLoading,
//         isLoadingCurrentUser: currentUserQuery.isLoading,
//         isUpdatingUser: updateUserMutation.isPending,
//         isDeletingUser: deleteUserMutation.isPending,

//         // Error states
//         allUsersError: allUsersQuery.error?.message,
//         currentUserError: currentUserQuery.error?.message,
//         updateUserError: updateUserMutation.error?.message,
//         deleteUserError: deleteUserMutation.error?.message,

//         // Actions
//         getUserById,
//         updateUser,
//         deleteUser,
//         clearUserError,

//         // Refetch functions
//         refetchAllUsers: allUsersQuery.refetch,
//         refetchCurrentUser: currentUserQuery.refetch,
//     };
// }; 