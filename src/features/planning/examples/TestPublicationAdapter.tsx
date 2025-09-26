// 'use client';

// import { useState } from 'react';
// import { usePublicationDependencies } from '../shared/hooks/usePublicationDependencies';
// import { CreatePublicationCommand, ListPublicationsQuery } from '../application/ports/publication-repository.port';
// import { Content, createContent } from '../domain/value-objects/content';
// import { useUser } from '../../auth/presentation/contexts/UserContext';
// import { 
//   List, 
//   Plus, 
//   Upload, 
//   Search, 
//   CheckCircle, 
//   Clock, 
//   FileText, 
//   Image, 
//   Video,
//   Instagram,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Activity
// } from 'lucide-react';

// export default function TestPublicationAdapter() {
//   const { publicationRepository, notificationService } = usePublicationDependencies();
//   const { user, isAuthenticated } = useUser();
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<any>(null);

//   // Test 1: Listar publicaciones
//   const testList = async () => {
//     if (!user?.userId) {
//       notificationService.showError('❌ No hay usuario autenticado');
//       return;
//     }

//     setLoading(true);
//     try {
//       const query: ListPublicationsQuery = {
//         userId: user.userId as UserId,
//         period: 'week',
//         referenceDate: '2025-09-18',
//         limit: 10,
//         offset: 0
//       };

//       const result = await publicationRepository.list(query);
//       setResult(result);
//       notificationService.showSuccess('✅ Lista obtenida correctamente');
//     } catch (error: any) {
//       notificationService.showError(`❌ Error al listar: ${error.message}`);
//       setResult({ error: error.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Test 2: Crear publicación con JSON
//   const testCreateJson = async () => {
//     if (!user?.userId) {
//       notificationService.showError('❌ No hay usuario autenticado');
//       return;
//     }

//     setLoading(true);
//     try {
//       const command: CreatePublicationCommand = {
//         userId: user.userId as UserId,
//         content: createContent({
//           text: 'Test publication from planning adapter',
//           hashtags: ['#test', '#planning'],
//           mentions: ['@testuser'],
//           links: ['https://example.com']
//         }),
//         platforms: ['instagram', 'facebook'],
//         platformContentTypes: {
//           instagram: 'post',
//           facebook: 'post',
//         },
//         action: 'draft'
//       };

//       const result = await publicationRepository.create(command);
//       setResult(result);
//       notificationService.showSuccess('✅ Publicación creada correctamente');
//     } catch (error: any) {
//       notificationService.showError(`❌ Error al crear: ${error.message}`);
//       setResult({ error: error.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Test 3: Crear publicación con archivos
//   const testCreateWithFiles = async () => {
//     if (!user?.userId) {
//       notificationService.showError('❌ No hay usuario autenticado');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Crear un archivo de prueba
//       const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' });

//       const command: CreatePublicationCommand = {
//         userId: user.userId as UserId,
//         content: createContent({
//           text: 'Test publication with files',
//           hashtags: ['#test', '#files']
//         }),
//         platforms: ['instagram'],
//         platformContentTypes: {
//           instagram: 'post'
//         } as Record<any, any>,
//         action: 'draft'
//       };

//       const result = await publicationRepository.createWithFiles(command, [testFile]);
//       setResult(result);
//       notificationService.showSuccess('✅ Publicación con archivos creada correctamente');
//     } catch (error: any) {
//       notificationService.showError(`❌ Error al crear con archivos: ${error.message}`);
//       setResult({ error: error.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Test 4: Obtener publicación por ID
//   const testGetById = async () => {
//     if (!user?.userId) {
//       notificationService.showError('❌ No hay usuario autenticado');
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await publicationRepository.getById({
//         id: 'test-publication-id' as PublicationId,
//         userId: user.userId as UserId
//       });
      
//       setResult(result);
//       notificationService.showSuccess('✅ Publicación obtenida por ID');
//     } catch (error: any) {
//       notificationService.showError(`❌ Error al obtener por ID: ${error.message}`);
//       setResult({ error: error.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString: string | undefined) => {
//     if (!dateString) return 'N/A';
//     try {
//       return new Date(dateString).toLocaleString('es-ES', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return 'Fecha inválida';
//     }
//   };

//   const getStatusColor = (status: string) => {
//     const colors = {
//       published: 'bg-green-100 text-green-800',
//       draft: 'bg-yellow-100 text-yellow-800',
//       scheduled: 'bg-blue-100 text-blue-800',
//       failed: 'bg-red-100 text-red-800',
//       cancelled: 'bg-gray-100 text-gray-800'
//     };
//     return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
//   };

//   const getPlatformIcon = (platform: string) => {
//     switch (platform) {
//       case 'instagram': return <Instagram size={14} />;
//       case 'facebook': return <Facebook size={14} />;
//       case 'twitter': return <Twitter size={14} />;
//       case 'linkedin': return <Linkedin size={14} />;
//       default: return <Activity size={14} />;
//     }
//   };

//   const getPlatformName = (platform: string) => {
//     const names = {
//       instagram: 'Instagram',
//       facebook: 'Facebook', 
//       twitter: 'Twitter',
//       linkedin: 'LinkedIn',
//       tiktok: 'TikTok'
//     };
//     return names[platform as keyof typeof names] || platform;
//   };

//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
//       <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        
//         {/* Header Empresarial */}
//         <div style={{ marginBottom: '40px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                 <Activity size={28} color="#007AFF" />
//                 <div>
//                   <h1 style={{ fontSize: '32px', fontWeight: '300', color: '#1a1a1a', margin: 0, letterSpacing: '-0.5px' }}>
//                     Publication Analytics
//                   </h1>
//                   <p style={{ fontSize: '16px', color: '#666', margin: '8px 0 0 0', fontWeight: '400' }}>
//                     API Testing Dashboard
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             {/* User Badge */}
//             {isAuthenticated && user && (
//               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'white', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
//                 <div style={{ width: '32px', height: '32px', backgroundColor: '#007AFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: '500' }}>
//                   {user.firstName?.charAt(0) || 'U'}
//                 </div>
//                 <div>
//                   <div style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>{user.firstName} {user.lastName}</div>
//                   <div style={{ fontSize: '12px', color: '#666' }}>{user.email}</div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px' }}>
//           {/* Sidebar - Controls */}
//           <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e0e0e0', padding: '24px', height: 'fit-content' }}>
//             <h2 style={{ fontSize: '18px', fontWeight: '500', color: '#1a1a1a', marginBottom: '20px', margin: 0 }}>Test Operations</h2>
            
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//               <button
//                 onClick={testList}
//                 disabled={loading || !isAuthenticated}
//                 style={{ 
//                   width: '100%', 
//                   backgroundColor: loading || !isAuthenticated ? '#f5f5f5' : '#007AFF', 
//                   color: loading || !isAuthenticated ? '#999' : 'white', 
//                   padding: '12px 16px', 
//                   borderRadius: '8px', 
//                   border: 'none', 
//                   cursor: loading || !isAuthenticated ? 'not-allowed' : 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500',
//                   transition: 'all 0.2s ease',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: '8px'
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!loading && isAuthenticated) {
//                     e.currentTarget.style.backgroundColor = '#0056CC';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!loading && isAuthenticated) {
//                     e.currentTarget.style.backgroundColor = '#007AFF';
//                   }
//                 }}
//               >
//                 <List size={16} />
//                 {loading ? 'Loading...' : 'List Publications'}
//               </button>

//               <button
//                 onClick={testCreateJson}
//                 disabled={loading || !isAuthenticated}
//                 style={{ 
//                   width: '100%', 
//                   backgroundColor: loading || !isAuthenticated ? '#f5f5f5' : 'white', 
//                   color: loading || !isAuthenticated ? '#999' : '#007AFF', 
//                   padding: '12px 16px', 
//                   borderRadius: '8px', 
//                   border: '1px solid #007AFF', 
//                   cursor: loading || !isAuthenticated ? 'not-allowed' : 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500',
//                   transition: 'all 0.2s ease',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: '8px'
//                 }}
//               >
//                 <Plus size={16} />
//                 {loading ? 'Loading...' : 'Create (JSON)'}
//               </button>

//               <button
//                 onClick={testCreateWithFiles}
//                 disabled={loading || !isAuthenticated}
//                 style={{ 
//                   width: '100%', 
//                   backgroundColor: loading || !isAuthenticated ? '#f5f5f5' : 'white', 
//                   color: loading || !isAuthenticated ? '#999' : '#007AFF', 
//                   padding: '12px 16px', 
//                   borderRadius: '8px', 
//                   border: '1px solid #007AFF', 
//                   cursor: loading || !isAuthenticated ? 'not-allowed' : 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500',
//                   transition: 'all 0.2s ease',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: '8px'
//                 }}
//               >
//                 <Upload size={16} />
//                 {loading ? 'Loading...' : 'Create (Files)'}
//               </button>

//               <button
//                 onClick={testGetById}
//                 disabled={loading || !isAuthenticated}
//                 style={{ 
//                   width: '100%', 
//                   backgroundColor: loading || !isAuthenticated ? '#f5f5f5' : 'white', 
//                   color: loading || !isAuthenticated ? '#999' : '#007AFF', 
//                   padding: '12px 16px', 
//                   borderRadius: '8px', 
//                   border: '1px solid #007AFF', 
//                   cursor: loading || !isAuthenticated ? 'not-allowed' : 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500',
//                   transition: 'all 0.2s ease',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: '8px'
//                 }}
//               >
//                 <Search size={16} />
//                 {loading ? 'Loading...' : 'Get by ID'}
//               </button>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div>
//             {!result && (
//               <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e0e0e0', padding: '48px', textAlign: 'center' }}>
//                 <div style={{ width: '64px', height: '64px', backgroundColor: '#f5f5f5', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                   <div style={{ width: '24px', height: '24px', backgroundColor: '#007AFF', borderRadius: '4px' }}></div>
//                 </div>
//                 <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1a1a1a', margin: '0 0 8px 0' }}>Ready to Test</h3>
//                 <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Select an operation from the sidebar to begin testing</p>
//               </div>
//             )}

//             {result && result.error && (
//               <div style={{ backgroundColor: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '8px', padding: '16px' }}>
//                 <div style={{ fontSize: '14px', fontWeight: '500', color: '#e53e3e', marginBottom: '4px' }}>Error</div>
//                 <p style={{ fontSize: '13px', color: '#c53030', margin: 0 }}>{result.error}</p>
//               </div>
//             )}

//             {result && result.publications && (
//               <div>
//                 {/* Stats */}
//                 <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e0e0e0', padding: '24px', marginBottom: '24px' }}>
//                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
//                     <div>
//                       <div style={{ fontSize: '28px', fontWeight: '300', color: '#1a1a1a', marginBottom: '4px' }}>
//                         {result.total}
//                       </div>
//                       <div style={{ fontSize: '14px', color: '#666' }}>Total Publications</div>
//                     </div>
//                     <div>
//                       <div style={{ fontSize: '28px', fontWeight: '300', color: '#34C759', marginBottom: '4px' }}>
//                         {result.publications.filter((p: any) => p.status === 'published').length}
//                       </div>
//                       <div style={{ fontSize: '14px', color: '#666' }}>Published</div>
//                     </div>
//                     <div>
//                       <div style={{ fontSize: '28px', fontWeight: '300', color: '#FF9500', marginBottom: '4px' }}>
//                         {result.publications.filter((p: any) => p.status === 'draft').length}
//                       </div>
//                       <div style={{ fontSize: '14px', color: '#666' }}>Drafts</div>
//                     </div>
//                     <div>
//                       <div style={{ fontSize: '28px', fontWeight: '300', color: '#007AFF', marginBottom: '4px' }}>
//                         {result.publications.filter((p: any) => p.status === 'scheduled').length}
//                       </div>
//                       <div style={{ fontSize: '14px', color: '#666' }}>Scheduled</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Publications Table */}
//                 <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
//                   <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0' }}>
//                     <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1a1a1a', margin: 0 }}>Publications</h3>
//                   </div>
                  
//                   <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
//                     {result.publications.map((pub: any, index: number) => (
//                       <div key={`pub-${pub.id || index}`} style={{ 
//                         padding: '20px 24px', 
//                         borderBottom: index < result.publications.length - 1 ? '1px solid #f0f0f0' : 'none',
//                         transition: 'background-color 0.2s ease'
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.backgroundColor = '#fafafa';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.backgroundColor = 'white';
//                       }}>
                        
//                         <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
//                           <div style={{ flex: 1 }}>
//                             {/* Content */}
//                             {pub.content?.text ? (
//                               <p style={{ 
//                                 fontSize: '15px', 
//                                 lineHeight: '1.5', 
//                                 color: '#1a1a1a', 
//                                 margin: '0 0 12px 0',
//                                 fontWeight: '400'
//                               }}>
//                                 {pub.content.text}
//                               </p>
//                             ) : (
//                               <div style={{ 
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '8px',
//                                 fontSize: '15px', 
//                                 color: '#999', 
//                                 margin: '0 0 12px 0',
//                                 fontStyle: 'italic'
//                               }}>
//                                 <FileText size={16} />
//                                 Media-only content
//                               </div>
//                             )}

//                             {/* Media Info */}
//                             {pub.content?.media && pub.content.media.length > 0 && (
//                               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
//                                 <div style={{ fontSize: '12px', color: '#666', backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}>
//                                   {pub.content.media.length} media file{pub.content.media.length > 1 ? 's' : ''}
//                                 </div>
//                                 {pub.content.media.slice(0, 3).map((media: any, idx: number) => (
//                                   <div key={idx} style={{ 
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: '4px',
//                                     fontSize: '11px', 
//                                     color: media.type === 'video' ? '#FF3B30' : '#34C759',
//                                     backgroundColor: media.type === 'video' ? '#fff5f5' : '#f0fff4',
//                                     padding: '4px 8px', 
//                                     borderRadius: '4px',
//                                     textTransform: 'uppercase',
//                                     fontWeight: '500'
//                                   }}>
//                                     {media.type === 'video' ? <Video size={12} /> : <Image size={12} />}
//                                     {media.type}
//                                   </div>
//                                 ))}
//                               </div>
//                             )}

//                             {/* Platforms */}
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
//                               {pub.platforms?.map((platform: string, idx: number) => (
//                                 <div key={idx} style={{ 
//                                   display: 'flex', 
//                                   alignItems: 'center', 
//                                   gap: '6px',
//                                   fontSize: '12px',
//                                   color: '#666',
//                                   backgroundColor: '#f8f8f8',
//                                   padding: '6px 10px',
//                                   borderRadius: '6px'
//                                 }}>
//                                   {getPlatformIcon(platform)}
//                                   <span style={{ fontWeight: '500' }}>{getPlatformName(platform)}</span>
//                                   <span style={{ fontSize: '10px', color: '#999', backgroundColor: '#eee', padding: '2px 4px', borderRadius: '3px' }}>
//                                     {pub.platformContentTypes?.[platform] || 'post'}
//                                   </span>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>

//                           {/* Right Side - Status & Date */}
//                           <div style={{ textAlign: 'right', minWidth: '140px' }}>
//                             <div style={{ 
//                               display: 'inline-block',
//                               padding: '4px 12px', 
//                               borderRadius: '20px', 
//                               fontSize: '11px', 
//                               fontWeight: '600',
//                               textTransform: 'uppercase',
//                               letterSpacing: '0.5px',
//                               backgroundColor: pub.status === 'published' ? '#E8F5E8' : pub.status === 'draft' ? '#FFF4E6' : pub.status === 'scheduled' ? '#E6F3FF' : '#FFE6E6',
//                               color: pub.status === 'published' ? '#2D7D32' : pub.status === 'draft' ? '#F57C00' : pub.status === 'scheduled' ? '#1976D2' : '#D32F2F',
//                               marginBottom: '8px'
//                             }}>
//                               {pub.status}
//                             </div>
                            
//                             <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>
//                               Created: {formatDate(pub.createdAt)}
//                             </div>
                            
//                             {pub.publishedAt && (
//                               <div style={{ fontSize: '12px', color: '#34C759', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
//                                 <CheckCircle size={12} />
//                                 Published: {formatDate(pub.publishedAt)}
//                               </div>
//                             )}
                            
//                             {pub.scheduledAt && !pub.publishedAt && (
//                               <div style={{ fontSize: '12px', color: '#007AFF', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
//                                 <Clock size={12} />
//                                 Scheduled: {formatDate(pub.scheduledAt)}
//                               </div>
//                             )}
                            
//                             <div style={{ fontSize: '10px', color: '#ccc', marginTop: '8px', fontFamily: 'monospace' }}>
//                               {pub.id?.slice(0, 8)}...
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {result && !result.publications && !result.error && (
//               <div style={{ backgroundColor: '#f0fff4', border: '1px solid #c6f6d5', borderRadius: '8px', padding: '16px' }}>
//                 <div style={{ fontSize: '14px', fontWeight: '500', color: '#2d7d32', marginBottom: '4px' }}>Success</div>
//                 <pre style={{ fontSize: '12px', color: '#1b5e20', overflow: 'auto', margin: 0, fontFamily: 'monospace' }}>
//                   {JSON.stringify(result, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
  